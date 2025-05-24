<?php
// app/Http/Controllers/ChatController.php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    // Método para obtener o crear una conversación
    public function getOrCreateConversation($userId)
    {
        // Buscar una conversación existente entre el usuario autenticado y el otro usuario
        $conversation = Conversation::where(function ($query) use ($userId) {
            $query->where('user1_id', Auth::id())
                  ->where('user2_id', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('user1_id', $userId)
                  ->where('user2_id', Auth::id());
        })->first();

        // Si no existe una conversación, crear una nueva
        if (!$conversation) {
            $conversation = Conversation::create([
                'user1_id' => Auth::id(),
                'user2_id' => $userId,
            ]);
        }

        return redirect()->route('chat.show', ['id' => $conversation->id]);
    }

    // Método para mostrar los mensajes de una conversación
    public function show($id)
    {
        $conversation = Conversation::findOrFail($id);

        // Verificar si el usuario autenticado es parte de la conversación
        if ($conversation->user1_id !== Auth::id() && $conversation->user2_id !== Auth::id()) {
            abort(403, 'No tienes permiso para ver esta conversación.');
        }

        // Obtener los mensajes de la conversación
        $messages = Message::where('conversation_id', $id)->get();

        return Inertia::render('Chat/Conversation', [
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    // Método para enviar un mensaje en una conversación
    public function sendMessage(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        // Obtener la conversación
        $conversation = Conversation::findOrFail($id);

        // Verificar si el usuario autenticado es parte de la conversación
        if ($conversation->user1_id !== Auth::id() && $conversation->user2_id !== Auth::id()) {
            abort(403, 'No tienes permiso para enviar mensajes en esta conversación.');
        }

        // Crear un nuevo mensaje
        Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::id(),
            'message' => $request->input('message'),
        ]);

        return redirect()->route('chat.show', ['id' => $conversation->id]);
    }
}
