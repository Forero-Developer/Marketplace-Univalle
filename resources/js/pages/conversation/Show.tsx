import { useForm, router, Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type MessageForm = {
  message: string;
};

interface ShowProps {
  conversation: {
    id: number;
    user1_id: number;
    user2_id: number;
    user1: { id: number; name: string };
    user2: { id: number; name: string };
  };
  messages: {
    id: number;
    message: string;
    user: { id: number; name: string };
  }[];
  currentUserId: number;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ];

export default function Show({ conversation, messages, currentUserId }: ShowProps) {
  const { data, setData, post, processing } = useForm<MessageForm>({
    message: '',
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.message.trim()) return;

    post(route("messages.store", conversation.id), {
      preserveScroll: true,
      onSuccess: () => setData('message', ''),
    });
  };

  const otherUser =
    conversation.user1.id === currentUserId
      ? conversation.user2
      : conversation.user1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={`Conversación con ${otherUser.name}`} />

    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-md">

      {/* Botón volver */}
      <button
        onClick={() => router.visit(route('conversations.index'))}
        className="mb-4 text-sm text-red-600 hover:underline font-medium"
      >
        ← Volver a conversaciones
      </button>

      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Conversación con {otherUser.name}
      </h1>

      <div className="h-80 overflow-y-auto space-y-3 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        {messages.length > 0 ? (
          messages.map((message) => {
            const isCurrentUser = message.user.id === currentUserId;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl shadow text-sm ${
                    isCurrentUser
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  <span className="block font-semibold text-xs mb-1">
                    {message.user.name}
                  </span>
                  <p className="text-base">{message.message}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic">No hay mensajes aún.</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex flex-col gap-3">
        <textarea
          value={data.message}
          onChange={(e) => setData('message', e.target.value)}
          className="w-full h-24 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          disabled={processing}
          className="self-end bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
          </AppLayout>
  );
}
