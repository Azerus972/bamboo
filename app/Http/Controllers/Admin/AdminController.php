<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use App\Models\Video;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/Index', [
            'stats' => [
                'users' => User::count(),
                'teams' => Team::count(),
                'videos' => Video::count(),
            ],
            'users' => User::latest()->limit(50)->get(['id', 'name', 'email', 'is_admin', 'created_at']),
        ]);
    }
}
