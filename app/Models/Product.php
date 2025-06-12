<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity; // Importa el trait

class Product extends Model
{
    use HasFactory, LogsActivity; // Usa el trait aquí

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
        'images' => 'array',
    ];

    // Define los atributos que quieres auditar
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'description', 'price', 'category', 'condition', 'faculty', 'images', 'user_id'])
            ->logOnlyDirty()
            ->useLogName('product');
    }

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
