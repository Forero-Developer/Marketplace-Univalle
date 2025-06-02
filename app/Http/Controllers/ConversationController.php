<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{
   public function index()
    {
        $user = auth()->user();

        $conversations = Conversation::with([
            'user1',
            'user2',
            'product',
            'messages' => function ($query) {
                $query->latest()->limit(1); // 🔥 Solo el último mensaje
            }
        ])
        ->where('user1_id', $user->id)
        ->orWhere('user2_id', $user->id)
        ->get();

        return Inertia::render('conversation/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation)
    {
        $user = auth()->user();
    
        // Verificar si el usuario está en la conversación
        if ($conversation->user1_id !== $user->id && $conversation->user2_id !== $user->id) {
            abort(403);
        }
    
        // Cargar los mensajes con el usuario que los envió
        $messages = $conversation->messages()->with('user')->get();
    
        // Cargar relaciones user1 y user2
        $conversation->load(['user1', 'user2']);
    
        return Inertia::render('conversation/Show', [
            'conversation' => $conversation,
            'messages' => $messages,
            'currentUserId' => $user->id, // 👈 esto es clave
        ]);
    }

    public function start(Product $product)
{
    $authUser = auth()->user();
    $productOwner = $product->user;

    if ($authUser->id === $productOwner->id) {
        return redirect()->back()->with('error', 'No puedes iniciar una conversación contigo mismo.');
    }

    // Buscar una conversación específica para este producto entre estos dos usuarios
    $conversation = Conversation::where('product_id', $product->id)
        ->where(function ($query) use ($authUser, $productOwner) {
            $query->where(function ($q) use ($authUser, $productOwner) {
                $q->where('user1_id', $authUser->id)
                  ->where('user2_id', $productOwner->id);
            })->orWhere(function ($q) use ($authUser, $productOwner) {
                $q->where('user1_id', $productOwner->id)
                  ->where('user2_id', $authUser->id);
            });
        })
        ->first();

    // Si no existe, la creamos
    if (!$conversation) {
        $conversation = Conversation::create([
            'user1_id' => $authUser->id,
            'user2_id' => $productOwner->id,
            'product_id' => $product->id, // ✅ Asociamos el producto
        ]);
    }

    return redirect()->route('conversations.show', $conversation->id);
}

}
