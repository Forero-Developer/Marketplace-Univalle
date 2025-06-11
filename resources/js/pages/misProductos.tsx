import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/marketplace/ProductGrid';
import TextLink from '@/components/text-link';
import { PlusIcon } from 'lucide-react';

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

  const handleToggleFavorite = (productId: number, favorited: boolean) => {
    console.log(`Producto ${productId} ha sido ${favorited ? 'añadido a favoritos' : 'eliminado de favoritos'}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis productos" />

      <div className="p-6 sm:pt-9 bg-gray-50">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6">
                    <div className="flex-1 min-w-0">
        
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Mis productos publicados
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                      Lista completa de productos que he publicados en la plataforma
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                      <TextLink
                      href={route("products.create")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-200 no-underline w-full sm:w-auto"
                      >
                      <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">Vender Producto</span>
                      </TextLink>
                    </div>
                  </div>

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
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </AppLayout>
  );
}
