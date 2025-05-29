<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function toggle(Request $request, Product $product)
    {
        $user = $request->user();

        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            $user->favorites()->detach($product->id);
            return response()->json(['favorited' => false]);
        } else {
            $user->favorites()->attach($product->id);
            return response()->json(['favorited' => true]);
        }
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $favorites = $user->favorites()
            ->with('user')
            ->paginate(12)
            ->through(function ($product) {
                $product->isFavorited = true;
                return $product;
            });

        return inertia('FavoriteProductsPage', [
            'products' => $favorites->items(),
            'userId' => $user->id,
        ]);
    }
}
