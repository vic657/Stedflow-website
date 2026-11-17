<?php

use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\SecureApiRequests;
use App\Http\Middleware\SecureWebResponses;
use App\Http\Middleware\SecurityResponseHeaders;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');
        $middleware->prepend(SecurityResponseHeaders::class);
        $middleware->redirectGuestsTo(fn (Request $request) => $request->is('api/*') ? null : route('admin.login'));
        $middleware->api(append: [SecureApiRequests::class]);
        $middleware->web(append: [SecureWebResponses::class]);
        $middleware->alias([
            'admin' => EnsureUserIsAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response) {
            return app(SecurityResponseHeaders::class)->apply(request(), $response);
        });

        $exceptions->render(function (Throwable $e, Request $request) {
            if (! $request->is('api/*') && ! $request->expectsJson()) {
                return null;
            }

            $status = match (true) {
                $e instanceof ValidationException => 422,
                $e instanceof AuthenticationException => 401,
                $e instanceof AuthorizationException => 403,
                $e instanceof ModelNotFoundException => 404,
                $e instanceof HttpExceptionInterface => $e->getStatusCode(),
                default => 500,
            };

            $requestId = $request->attributes->get('request_id') ?: (string) Str::uuid();
            $request->attributes->set('request_id', $requestId);
            $message = match (true) {
                $e instanceof ValidationException => 'Please check the highlighted fields.',
                $e instanceof AuthenticationException => 'Please log in to continue.',
                $e instanceof AuthorizationException => 'You are not allowed to do that.',
                $e instanceof ModelNotFoundException => 'The requested item was not found.',
                $e instanceof HttpException && $e->getMessage() !== '' && $status < 500 => $e->getMessage(),
                $status === 404 => 'The requested endpoint was not found.',
                $status === 429 => 'Too many requests. Please wait a moment and try again.',
                $status >= 500 => 'We could not complete this request. Please try again.',
                default => 'Request failed. Please try again.',
            };

            $payload = [
                'success' => false,
                'message' => $message,
                'request_id' => $requestId,
            ];

            if ($e instanceof ValidationException) {
                $payload['errors'] = $e->errors();
            }

            return response()
                ->json($payload, $status)
                ->header('X-Request-Id', $requestId);
        });
    })->create();
