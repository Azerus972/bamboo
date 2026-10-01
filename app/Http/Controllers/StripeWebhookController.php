<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use UnexpectedValueException;

/**
 * Receives Stripe webhooks, verifies their signature with STRIPE_WEBHOOK_SECRET
 * and keeps the user's subscription status in sync.
 */
class StripeWebhookController extends Controller
{
    public function __invoke(Request $request): Response
    {
        try {
            $event = Webhook::constructEvent(
                $request->getContent(),
                (string) $request->header('Stripe-Signature'),
                (string) config('services.stripe.webhook_secret'),
            );
        } catch (SignatureVerificationException|UnexpectedValueException) {
            return response('Invalid signature', 400);
        }

        $object = $event->data->object;

        match ($event->type) {
            'checkout.session.completed' => User::whereKey($object->client_reference_id)->update([
                'stripe_customer_id' => $object->customer,
                'stripe_subscription_id' => $object->subscription,
                'subscription_status' => 'active',
            ]),
            'customer.subscription.updated', 'customer.subscription.deleted' => User::where('stripe_subscription_id', $object->id)->update([
                'subscription_status' => $object->status,
            ]),
            default => null,
        };

        return response('OK');
    }
}
