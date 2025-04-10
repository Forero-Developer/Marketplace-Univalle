<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'condition',
        'faculty',
        'images',
        'user_id',
    ];

    protected $casts = [
        'images' => 'array', // Para que Laravel trate las imágenes como array
    ];

    // Relación con el usuario (quien publica el producto)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted()
{
    static::deleting(function ($product) {
        if ($product->images) {
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }
    });
}

}
