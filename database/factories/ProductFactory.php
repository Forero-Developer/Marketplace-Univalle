<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        // Obtener un usuario aleatorio para asociar el producto
        $userId = User::inRandomOrder()->first()?->id ?? User::factory()->create()->id;

        // Directorio donde se guardarán las imágenes
        $directory = storage_path('app/public/products');

        // Asegurarse que el directorio existe
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        // Generar dos imágenes físicas y obtener sus nombres
        $image1 = $this->faker->image($directory, 640, 480, null, false);
        $image2 = $this->faker->image($directory, 640, 480, null, false);

        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(1000, 100000),
            'category' => fake()->randomElement(['Electrónica', 'Ropa', 'Libros', 'Muebles']),
            'condition' => fake()->randomElement(['nuevo', 'usado']),
            'faculty' => fake()->randomElement(['Ingeniería', 'Medicina', 'Derecho', 'Arquitectura']),
            // Guardar la ruta relativa para luego acceder con asset('storage/products/...')
            'images' => json_encode([
                "products/$image1",
                "products/$image2",
            ]),
            'user_id' => $userId,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
