<?php

namespace App\Models;

use Database\Factories\VideoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['title', 'hook', 'hashtags', 'status', 'scheduled_for', 'views', 'likes'])]
class Video extends Model
{
    /** @use HasFactory<VideoFactory> */
    use HasFactory;

    public const STATUSES = ['idea', 'scripted', 'filmed', 'posted'];

    public const FREE_LIMIT = 5;

    /**
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    protected function casts(): array
    {
        return [
            'scheduled_for' => 'date:Y-m-d',
        ];
    }
}
