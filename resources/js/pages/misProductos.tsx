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

      <div className="p-6 sm:pt-9">

        {/* Título y botón alineados horizontalmente */}
        <div className="flex items-center justify-between flex-wrap gap-y-4 mb-4">
          <h1 className="text-2xl font-bold text-red-600">Mis productos publicados</h1>

          {/* Botón visible en pantallas grandes */}
          <TextLink
            href={route("products.create")}
            className="hidden sm:inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-3 rounded no-underline text-sm"
          >
            <PlusIcon className="h-4 w-4" />
            Vender
          </TextLink>
        </div>

        <p className="text-gray-500 mb-4">Aquí puedes ver todos los productos que has publicado.</p>

        {/* Botón visible en móviles */}
        <TextLink
          href={route("products.create")}
          className="sm:hidden inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded no-underline text-base mt-2 mb-6"
        >
          <PlusIcon className="h-4 w-4" />
          Vender
        </TextLink>

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
