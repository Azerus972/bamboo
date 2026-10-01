<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillingTest extends TestCase
{
    use RefreshDatabase;

    private const SECRET = 'whsec_test_only';

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.stripe.webhook_secret' => self::SECRET]);
    }

    public function test_checkout_is_unavailable_until_stripe_is_configured()
    {
        config(['services.stripe.secret' => null, 'services.stripe.price' => null]);
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get("/{$user->currentTeam->slug}/billing/checkout")
            ->assertStatus(503);
    }

    public function test_completed_checkout_makes_the_user_pro()
    {
        $user = User::factory()->create();
        $this->assertFalse($user->isPro());

        $this->sendWebhook('checkout.session.completed', [
            'id' => 'cs_test_1',
            'client_reference_id' => (string) $user->id,
            'customer' => 'cus_test_1',
            'subscription' => 'sub_test_1',
        ])->assertOk();

        $this->assertTrue($user->fresh()->isPro());
    }

    public function test_cancelled_subscription_removes_pro()
    {
        $user = User::factory()->create();
        $user->forceFill(['stripe_subscription_id' => 'sub_test_1', 'subscription_status' => 'active'])->save();

        $this->sendWebhook('customer.subscription.deleted', [
            'id' => 'sub_test_1',
            'status' => 'canceled',
        ])->assertOk();

        $this->assertFalse($user->fresh()->isPro());
    }

    public function test_webhooks_with_an_invalid_signature_are_rejected()
    {
        $this->call('POST', '/stripe/webhook', [], [], [], [
            'HTTP_STRIPE_SIGNATURE' => 't=1,v1=invalid',
            'CONTENT_TYPE' => 'application/json',
        ], '{"type":"checkout.session.completed"}')->assertStatus(400);
    }

    /**
     * @param  array<string, mixed>  $object
     */
    private function sendWebhook(string $type, array $object)
    {
        $payload = json_encode([
            'id' => 'evt_test',
            'object' => 'event',
            'type' => $type,
            'data' => ['object' => $object],
        ]);
        $timestamp = time();
        $signature = hash_hmac('sha256', "{$timestamp}.{$payload}", self::SECRET);

        return $this->call('POST', '/stripe/webhook', [], [], [], [
            'HTTP_STRIPE_SIGNATURE' => "t={$timestamp},v1={$signature}",
            'CONTENT_TYPE' => 'application/json',
        ], $payload);
    }
}
