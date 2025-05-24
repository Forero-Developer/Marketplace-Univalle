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

        $conversations = Conversation::with(['user1', 'user2']) // Asegúrate de cargar relaciones para mostrar nombres
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

        $conversation = Conversation::where(function ($query) use ($authUser, $productOwner) {
            $query->where('user1_id', $authUser->id)
                  ->where('user2_id', $productOwner->id);
        })->orWhere(function ($query) use ($authUser, $productOwner) {
            $query->where('user1_id', $productOwner->id)
                  ->where('user2_id', $authUser->id);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user1_id' => $authUser->id,
                'user2_id' => $productOwner->id,
            ]);
        }

        return redirect()->route('conversations.show', $conversation->id);
    }
}
