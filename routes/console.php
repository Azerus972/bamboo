<?php

use App\Models\TeamInvitation;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    TeamInvitation::query()
        ->whereNotNull('expires_at')
        ->where('expires_at', '<', now())
        ->delete();
})->daily()->description('Delete expired team invitations');

Artisan::command('bamboo:make-admin {email}', function (string $email) {
    $user = User::where('email', $email)->first();

    if (! $user) {
        $this->error("No user found for {$email}. Register first, then run this command.");

        return 1;
    }

    $user->forceFill(['is_admin' => true])->save();
    $this->info("{$email} is now an admin.");
})->purpose('Grant the admin role to an existing user');
