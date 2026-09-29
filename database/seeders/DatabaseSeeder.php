<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Demo data only, no external calls. The demo password comes from
     * DEMO_PASSWORD; when it is empty a random one is generated and printed.
     */
    public function run(): void
    {
        $password = env('DEMO_PASSWORD') ?: Str::password(16);

        $user = User::factory()->create([
            'name' => 'Demo Creator',
            'email' => 'demo@example.test',
            'password' => $password,
        ]);

        Video::factory()->count(4)->create(['team_id' => $user->currentTeam->id]);

        $this->command?->info("Demo account: demo@example.test / {$password}");
    }
}
