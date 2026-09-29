<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class VideoTest extends TestCase
{
    use RefreshDatabase;

    public function test_members_can_plan_a_video()
    {
        $user = User::factory()->create();
        $team = $user->currentTeam;

        $this->actingAs($user)
            ->post("/{$team->slug}/videos", ['title' => 'Morning routine', 'status' => 'idea'])
            ->assertRedirect();

        $this->assertDatabaseHas('videos', ['team_id' => $team->id, 'title' => 'Morning routine']);

        $this->actingAs($user)
            ->get("/{$team->slug}/videos")
            ->assertInertia(fn (Assert $page) => $page->component('videos/Index')->has('videos', 1));
    }

    public function test_free_plan_is_limited()
    {
        $user = User::factory()->create();
        $team = $user->currentTeam;
        Video::factory()->count(Video::FREE_LIMIT)->create(['team_id' => $team->id]);

        $this->actingAs($user)
            ->post("/{$team->slug}/videos", ['title' => 'One too many', 'status' => 'idea'])
            ->assertSessionHasErrors('title');
    }

    public function test_teams_cannot_access_each_others_videos()
    {
        $alice = User::factory()->create();
        $bob = User::factory()->create();
        $video = Video::factory()->create(['team_id' => $bob->currentTeam->id]);

        $this->actingAs($alice)->get("/{$bob->currentTeam->slug}/videos")->assertForbidden();
        $this->actingAs($alice)
            ->delete("/{$alice->currentTeam->slug}/videos/{$video->id}")
            ->assertNotFound();

        $this->assertDatabaseHas('videos', ['id' => $video->id]);
    }
}
