<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // ID único
            $table->string('name'); // Nombre del producto
            $table->text('description'); // Descripción
            $table->unsignedBigInteger('price');  // Precio
            $table->string('category'); // Categoría
            $table->string('condition'); // Estado del producto (nuevo/usado)
            $table->string('faculty'); // Facultad
            $table->json('images')->nullable(); // Imágenes (guardadas como JSON)
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relación con el usuario que publica
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
