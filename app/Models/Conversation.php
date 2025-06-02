<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Message;
use App\Models\User;
use App\Models\Product; // ✅ Importar el modelo Product

class Conversation extends Model
{
    use HasFactory;

    // ✅ Incluir 'product_id' en los fillable
    protected $fillable = ['user1_id', 'user2_id', 'product_id'];

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

    // ✅ Relación con el producto
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
