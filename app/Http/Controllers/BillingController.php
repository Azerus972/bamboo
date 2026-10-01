<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Symfony\Component\HttpFoundation\Response;

/**
 * Stripe billing (test mode) with the official stripe-php SDK. Subscription
 * state is synced by StripeWebhookController (POST /stripe/webhook).
 */
class BillingController extends Controller
{
    public function checkout(Request $request, Team $currentTeam): Response
    {
        $price = config('services.stripe.price');

        abort_unless($price && config('services.stripe.secret'), 503, 'Stripe is not configured.');

        $user = $request->user();
        $returnUrl = route('videos.index', $currentTeam);

        $session = $this->stripe()->checkout->sessions->create(array_filter([
            'mode' => 'subscription',
            'line_items' => [['price' => $price, 'quantity' => 1]],
            'client_reference_id' => (string) $user->id,
            'customer' => $user->stripe_customer_id,
            'customer_email' => $user->stripe_customer_id ? null : $user->email,
            'success_url' => $returnUrl,
            'cancel_url' => $returnUrl,
        ]));

        return redirect()->away($session->url);
    }

    public function portal(Request $request, Team $currentTeam): Response
    {
        $customer = $request->user()->stripe_customer_id;

        abort_unless($customer && config('services.stripe.secret'), 404);

        $session = $this->stripe()->billingPortal->sessions->create([
            'customer' => $customer,
            'return_url' => route('videos.index', $currentTeam),
        ]);

        return redirect()->away($session->url);
    }

    private function stripe(): StripeClient
    {
        return new StripeClient(config('services.stripe.secret'));
    }
}
