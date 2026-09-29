<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * TikTok content planner. Every query goes through $currentTeam->videos(),
 * so a team can never read or modify another team's videos.
 */
class VideoController extends Controller
{
    public function index(Request $request, Team $currentTeam): Response
    {
        $videos = $currentTeam->videos()->orderBy('scheduled_for')->get();

        return Inertia::render('videos/Index', [
            'videos' => $videos,
            'statuses' => Video::STATUSES,
            'isPro' => $request->user()->isPro(),
            'freeLimit' => Video::FREE_LIMIT,
            'stats' => [
                'total' => $videos->count(),
                'posted' => $videos->where('status', 'posted')->count(),
                'views' => (int) $videos->sum('views'),
                'engagement' => $videos->sum('views') > 0
                    ? round($videos->sum('likes') / $videos->sum('views') * 100, 1)
                    : 0,
            ],
        ]);
    }

    public function store(Request $request, Team $currentTeam): RedirectResponse
    {
        if (! $request->user()->isPro() && $currentTeam->videos()->count() >= Video::FREE_LIMIT) {
            return back()->withErrors(['title' => 'Free plan limit reached. Upgrade to Pro to plan more videos.']);
        }

        $currentTeam->videos()->create($this->validated($request));

        return back();
    }

    public function update(Request $request, Team $currentTeam, int $video): RedirectResponse
    {
        $currentTeam->videos()->findOrFail($video)->update($this->validated($request));

        return back();
    }

    public function destroy(Team $currentTeam, int $video): RedirectResponse
    {
        $currentTeam->videos()->findOrFail($video)->delete();

        return back();
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'hook' => ['nullable', 'string', 'max:255'],
            'hashtags' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(Video::STATUSES)],
            'scheduled_for' => ['nullable', 'date'],
            'views' => ['nullable', 'integer', 'min:0'],
            'likes' => ['nullable', 'integer', 'min:0'],
        ]) + ['views' => 0, 'likes' => 0];
    }
}
