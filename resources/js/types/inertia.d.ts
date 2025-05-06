// types/inertia.d.ts

import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

export interface User {
  id: number;
  name: string;
  // agrega otros campos del usuario si los necesitas
}

export interface PageProps extends InertiaPageProps {
  auth: {
    user: User;
  };
  [key: string]: unknown;
}
