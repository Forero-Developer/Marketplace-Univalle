<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Mostrar todos los productos en el dashboard
    public function index()
    {
        $products = Product::with('user')->get();

        return Inertia::render('dashboard', [
            'products' => $products,
            'userId' => request()->user()->id,
        ]);
    }

    // Guardar un nuevo producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:100',
            'condition' => 'required|string|max:100',
            'faculty' => 'required|string|max:100',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public'); // guarda en storage/app/public/products
                $imagePaths[] = $path;
    }
}

        $product = Product::create([
            ...$validated,
            'images' => $imagePaths, // array de rutas
            'user_id' => request()->user()->id, // Relaciona el producto al usuario autenticado
        ]);

        return redirect()->route('dashboard')->with('success', 'Producto creado con éxito.');
    }
    


    public function destroy(Product $product)
    {
    if ($product->user_id !== request()->user()->id) {
        abort(403, 'No autorizado');
    }
    
    $product->delete();
    
    return redirect()->route('dashboard')->with('success', 'Producto eliminado con éxito.');
}

}