<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function store(Request $request, $conversationId)
    {
        $user = auth()->user();

        // Validar que el mensaje no esté vacío
        $request->validate([
            'message' => 'required|string',
        ]);

        // Verificar que el usuario está participando en la conversación
        $conversation = Conversation::findOrFail($conversationId);
        if ($conversation->user1_id !== $user->id && $conversation->user2_id !== $user->id) {
            abort(403);
        }

        // Crear el mensaje
        $message = new Message();
        $message->conversation_id = $conversationId;
        $message->user_id = $user->id;
        $message->message = $request->message;
        $message->save();

        // Retornar el mensaje para actualizar el frontend
        return redirect()->route('conversations.show', $conversationId);
    }
}
