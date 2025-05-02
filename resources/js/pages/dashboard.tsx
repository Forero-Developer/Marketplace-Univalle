import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { LogOut } from 'lucide-react';
import ProductCard from '@/components/marketplace/ProductCard';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  faculty: string;
  images: string[];
  user_id: number;
  user: {
    id: number;
    name: string;
  };
}

interface Props {
  products: Product[];
  userId: number;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard({ products, userId }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      
      <div className="absolute top-4 right-4">
        <TextLink href={route('products.create')}>
          <LogOut />
        </TextLink>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Productos publicados</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">No hay productos aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentUserId={userId}
                loadingId={loadingId}
                setLoadingId={setLoadingId}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
