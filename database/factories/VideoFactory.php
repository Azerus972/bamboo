<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Video>
 */
class VideoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'team_id' => Team::factory(),
            'title' => fake()->sentence(4),
            'hook' => 'POV: '.fake()->sentence(6),
            'hashtags' => '#fyp #tiktok #'.fake()->word(),
            'status' => fake()->randomElement(Video::STATUSES),
            'scheduled_for' => fake()->dateTimeBetween('now', '+1 month'),
            'views' => fake()->numberBetween(0, 200000),
            'likes' => fake()->numberBetween(0, 20000),
        ];
    }
}
