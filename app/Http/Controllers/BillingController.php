<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Stripe billing (test mode) through Laravel Cashier. Subscription state is
 * synced by Cashier's built-in webhook route: POST /stripe/webhook.
 */
class BillingController extends Controller
{
    public function checkout(Request $request, Team $currentTeam): Response
    {
        $price = config('services.stripe.price');

        abort_unless($price && config('cashier.secret'), 503, 'Stripe is not configured.');

        return $request->user()
            ->newSubscription('default', $price)
            ->checkout([
                'success_url' => route('videos.index', $currentTeam),
                'cancel_url' => route('videos.index', $currentTeam),
            ])
            ->redirect();
    }

    public function portal(Request $request, Team $currentTeam): Response
    {
        return $request->user()->redirectToBillingPortal(route('videos.index', $currentTeam));
    }
}
