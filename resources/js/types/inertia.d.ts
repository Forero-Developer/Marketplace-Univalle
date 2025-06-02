// types/inertia.d.ts


import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user'; // Asegúrate de incluir esto
  // agrega otros campos si los necesitas
}

export interface PageProps extends InertiaPageProps {
  auth: {
    user: User | null; // <-- esto es mejor para cuando el usuario no está autenticado
  };
  [key: string]: unknown;
}
