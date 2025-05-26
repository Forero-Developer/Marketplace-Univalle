import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import {PlusIcon, } from 'lucide-react';
import { useEffect, useState } from 'react';
import FiltersBar from '@/components/marketplace/FiltersBar';
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
  filters: {
    search: string;
    category: string;
    faculty: string;
  };
  allCategories: string[];
  allFaculties: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: '/dashboard',
  },
];

export default function Dashboard({
  products,
  userId,
  filters,
  allCategories,
  allFaculties,
}: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [category, setCategory] = useState(filters.category || '');
  const [faculty, setFaculty] = useState(filters.faculty || '');
  const [allProducts, setAllProducts] = useState(products.data);
  const [page, setPage] = useState(products.current_page);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [lastPage, setLastPage] = useState(products.last_page);

  // Actualiza los filtros en la URL y en el backend
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(route('dashboard'), {
        search,
        category,
        faculty,
      }, {
        preserveState: true,
        replace: true,
      });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, category, faculty]);

  // Actualiza productos si cambian desde backend
  useEffect(() => {
  setAllProducts(products.data);
  setPage(products.current_page);
  setLastPage(products.last_page); // Asegúrate que llegue en los props
  }, [products]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    const params = new URLSearchParams({
      page: String(nextPage),
      search,
      category,
      faculty,
    });

    const response = await fetch(`/api/products/load-more?${params.toString()}`);
    const data = await response.json();

    setAllProducts(prev => [...prev, ...data.data]);
    setPage(data.current_page);
    setLastPage(data.last_page);
  };

return (
  <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Dashboard" />

    <div className="p-6">
      <TextLink
        href={route("products.create")}
        className="absolute right-4 inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-3 rounded no-underline"
      >
        <PlusIcon className="h-4 w-4" />
        Vender
      </TextLink>

      <h1 className="text-2xl font-bold text-black-600 mb-1">Marketplace Univalle</h1>
      <p className="text-gray-500 mb-4">
        Compra y vende productos <br />dentro de la comunidad <br />universitaria.
      </p>

      <FiltersBar
        search={search}
        category={category}
        faculty={faculty}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onFacultyChange={setFaculty}
        categories={allCategories}
        faculties={allFaculties}
      />

      {allProducts.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos.</p>
      ) : (
        <ProductGrid
          products={allProducts}  // Ya viene filtrado backend
          userId={userId}
          loadingId={loadingId}
          setLoadingId={setLoadingId}
          showLoadMore={page < lastPage}
          onLoadMore={loadMoreProducts}
        />
      )}
    </div>
  </AppLayout>
);

}
