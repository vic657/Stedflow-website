<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ApiAuthorizationMatrixTest extends TestCase
{
    use RefreshDatabase;

    public function test_every_nonpublic_api_route_requires_authentication(): void
    {
        $public = [
            'POST api/register', 'POST api/login',
            'POST api/email/verify', 'POST api/email/resend',
            'POST api/password/forgot', 'POST api/password/reset',
            'GET api/security/login-events/{token}/approve',
            'GET api/security/login-events/{token}/deny',
            'GET api/test',
        ];
        $checked = 0;

        foreach (Route::getRoutes() as $route) {
            if (! str_starts_with($route->uri(), 'api/')) {
                continue;
            }
            $method = $route->methods()[0];
            $label = $method.' '.$route->uri();
            if (in_array($label, $public, true)) {
                continue;
            }

            $this->assertContains('auth:sanctum', $route->gatherMiddleware(), $label.' must require Sanctum');
            $uri = '/'.preg_replace('/\{[^}]+\}/', '999999999', $route->uri());
            $this->json($method, $uri)->assertUnauthorized();
            $checked++;
        }

        $this->assertGreaterThan(30, $checked, 'The financial and account route collection must be exercised.');
    }
}
