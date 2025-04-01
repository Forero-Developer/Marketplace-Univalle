import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contactos',
        href: '/dashboard',
    },
];

const index = () => {
  return (
    
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head
    title="Contactos" />
    <div>
    <a rel="stylesheet" href={route('contacts.create')}>Crear Contacto</a>

    </div>
    </AppLayout>


  )
}

export default index
