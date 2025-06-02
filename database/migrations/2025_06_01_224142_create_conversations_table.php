<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user1_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user2_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();

            // Evitar conversaciones duplicadas para el mismo producto entre los mismos usuarios
            $table->unique(['user1_id', 'user2_id', 'product_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
