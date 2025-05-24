import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { PageProps } from '@/types/inertia'; // Ajusta la ruta según tu proyecto
import AppLayout from '@/layouts/app-layout';

interface Conversation {
  id: number;
  user1_id: number;
  user2_id: number;
  user1: PageProps['auth']['user'];
  user2: PageProps['auth']['user'];
}

interface Props {
  conversations: Conversation[];
}

export default function Index({ conversations }: Props) {
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
        <Head title="Mis Conversaciones" />
    
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      {/* Botón Volver */}
      <div className="mb-4">
        <Link
          href={route('dashboard')}
          className="inline-flex items-center text-red-600 hover:text-red-700 transition font-medium"
          >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Volver al dashboard
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-red-600 mb-6">Mis Conversaciones</h1>

      {conversations.length === 0 ? (
          <p className="text-gray-600 italic">No tienes conversaciones iniciadas aún.</p>
    ) : (
        <ul className="space-y-3">
          {conversations.map((conversation) => {
            const otherUser =
              conversation.user1_id !== user.id
                ? conversation.user1
                : conversation.user2;
                
            return (
              <li key={conversation.id}>
                <Link
                  href={route('conversations.show', conversation.id)}
                  className="block px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-red-50 transition-all"
                  >
                  <span className="text-gray-800 font-medium">
                    Conversación con{' '}
                    <span className="text-red-600 font-semibold">
                      {otherUser.name}
                    </span>
                  </span>
                </Link>
              </li>
            );
        })}
        </ul>
      )}
    </div>
                </AppLayout>
  );
  
}
