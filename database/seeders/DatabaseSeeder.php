<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
{
    // Crear 10 usuarios (puedes crear algunos admins así: User::factory()->admin()->count(2)->create();)
    \App\Models\User::factory(10)->create();

    // Crear 50 productos asociados a usuarios existentes o creados
    \App\Models\Product::factory(40)->create();
}

}
