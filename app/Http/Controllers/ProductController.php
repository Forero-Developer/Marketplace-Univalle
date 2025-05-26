<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Mostrar todos los productos en el dashboard
    public function index(Request $request)
{
    $userId = $request->user()->id; // Usuario autenticado

    $search = $request->query('search', '');
    $category = $request->query('category', '');
    $faculty = $request->query('faculty', '');

    $query = Product::with('user')
        ->where('user_id', '!=', $userId); // Filtra productos que NO son del usuario

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%$search%")
              ->orWhere('category', 'like', "%$search%")
              ->orWhere('faculty', 'like', "%$search%");
        });
    }

    if ($category) {
        $query->where('category', $category);
    }

    if ($faculty) {
        $query->where('faculty', $faculty);
    }

    $products = $query->paginate(6);

    $allCategories = Product::select('category')->distinct()->pluck('category');
    $allFaculties = Product::select('faculty')->distinct()->pluck('faculty');

    return Inertia::render('dashboard', [
        'products' => $products,
        'userId' => $userId,
        'filters' => [
            'search' => $search,
            'category' => $category,
            'faculty' => $faculty,
        ],
        'allCategories' => $allCategories,
        'allFaculties' => $allFaculties,
    ]);
}

 public function misProductos(Request $request)
    {
        $user = $request->user();

        $products = Product::with('user')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('misProductos', [
            'products' => $products,
            'userId' => $user->id,
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
            'images' => 'required|array|min:1',
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
    
    return redirect()->route('misProductos.index')->with('success', 'Producto eliminado con éxito.');
}

public function loadMore(Request $request)
{
    $userId = $request->user()->id;

    $page = $request->query('page', 2);
    $search = $request->query('search', '');
    $category = $request->query('category', '');
    $faculty = $request->query('faculty', '');

    $query = Product::with('user')
        ->where('user_id', '!=', $userId); // Filtrar productos distintos al usuario

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%$search%")
              ->orWhere('category', 'like', "%$search%")
              ->orWhere('faculty', 'like', "%$search%");
        });
    }

    if ($category) {
        $query->where('category', $category);
    }

    if ($faculty) {
        $query->where('faculty', $faculty);
    }

    $products = $query->paginate(6, ['*'], 'page', $page);

    return response()->json($products);
}


}