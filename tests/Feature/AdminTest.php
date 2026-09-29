<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_regular_users_cannot_open_admin()
    {
        $this->actingAs(User::factory()->create())->get('/admin')->assertForbidden();
    }

    public function test_admin_command_grants_access()
    {
        $user = User::factory()->create(['email' => 'boss@example.test']);

        $this->artisan('bamboo:make-admin', ['email' => 'boss@example.test'])->assertSuccessful();

        $this->actingAs($user->fresh())->get('/admin')->assertOk();
    }

    public function test_healthcheck_responds()
    {
        $this->get('/up')->assertOk();
    }
}
