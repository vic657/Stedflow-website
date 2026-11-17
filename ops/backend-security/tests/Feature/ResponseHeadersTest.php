<?php

namespace Tests\Feature;

use Tests\TestCase;

class ResponseHeadersTest extends TestCase
{
    public function test_unauthenticated_api_errors_have_security_headers_and_cannot_be_cached(): void
    {
        $this->getJson('/api/user')
            ->assertUnauthorized()
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY')
            ->assertHeader('Referrer-Policy', 'no-referrer')
            ->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_unknown_api_routes_keep_security_headers(): void
    {
        $this->getJson('/api/not-a-real-endpoint')
            ->assertNotFound()
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_https_responses_include_hsts_without_changing_subdomain_policy(): void
    {
        $this->getJson('https://localhost/api/user')
            ->assertUnauthorized()
            ->assertHeader('Strict-Transport-Security', 'max-age=31536000');
    }
}
