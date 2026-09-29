<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\VideoController;
use App\Http\Middleware\EnsureTeamMembership;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');

        Route::get('videos', [VideoController::class, 'index'])->name('videos.index');
        Route::post('videos', [VideoController::class, 'store'])->name('videos.store');
        Route::put('videos/{video}', [VideoController::class, 'update'])->name('videos.update');
        Route::delete('videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');

        Route::get('billing/checkout', [BillingController::class, 'checkout'])->name('billing.checkout');
        Route::get('billing/portal', [BillingController::class, 'portal'])->name('billing.portal');
    });

Route::get('admin', AdminController::class)
    ->middleware(['auth', 'verified', EnsureUserIsAdmin::class])
    ->name('admin');

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
