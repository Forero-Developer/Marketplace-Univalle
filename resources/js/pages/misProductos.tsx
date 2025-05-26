import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/marketplace/ProductGrid';

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
  products: {
    data: Product[];
    current_page: number;
    last_page: number;
  };
  userId: number;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: '/dashboard',
  },
  {
    title: 'Mis productos',
    href: '/mis-productos',
  },
];

export default function MyProductsPage({ products, userId }: Props) {
  const [myProducts, setMyProducts] = useState(products.data);
  const [page, setPage] = useState(products.current_page);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    setMyProducts(products.data);
    setPage(products.current_page);
  }, [products]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;

    const response = await fetch(`/api/my-products/load-more?page=${nextPage}`);
    const data = await response.json();

    setMyProducts(prev => [...prev, ...data]);
    setPage(nextPage);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis productos" />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Mis productos publicados</h1>

        {myProducts.length === 0 ? (
          <p className="text-gray-500">No has publicado ningún producto aún.</p>
        ) : (
          <ProductGrid
            products={myProducts}
            userId={userId}
            loadingId={loadingId}
            setLoadingId={setLoadingId}
            showLoadMore={page < products.last_page}
            onLoadMore={loadMoreProducts}
          />
        )}
      </div>
    </AppLayout>
  );
}
