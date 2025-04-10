import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { LogOut } from 'lucide-react';

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
    const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      router.delete(route('products.destroy', id));
    }
  };

  return (

    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className='absolute top-4 right-4 '>
                    <TextLink href={route('products.create')}>
                        <LogOut/>  
                    </TextLink>
    </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Productos publicados</h1>

        
        {products.length === 0 ? (
          <p className="text-gray-500">No hay productos aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                <p className="text-sm">Precio: <strong>${product.price}</strong></p>
                <p className="text-sm">Categoría: {product.category}</p>
                <p className="text-sm">Estado: {product.condition}</p>
                <p className="text-sm">Facultad: {product.faculty}</p>

                {product.images && product.images.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={`/storage/${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                )}

                {product.user_id === userId && (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
