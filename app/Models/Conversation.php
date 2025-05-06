<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Message; // Agregar esta importación
use App\Models\User; // También es buena práctica importar User

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['user1_id', 'user2_id'];

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
    
    public function user1(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user1_id');
    }
    
    public function user2(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user2_id');
    }
}
