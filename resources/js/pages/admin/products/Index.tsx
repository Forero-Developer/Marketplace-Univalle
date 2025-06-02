import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import FiltersBar from '@/components/marketplace/FiltersBar';
import ProductGridAdmin from '@/components/marketplace/ProductGridAdmin';

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
  isFavorited?: boolean;
}

interface Props {
  products: {
    data: Product[];
    current_page: number;
    last_page: number;
  };
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
  {
    title: 'Administrar productos',
    href: '/admin/products',
  },
];

export default function AdminProducts({
  products,
  filters,
  allCategories,
  allFaculties,
}: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [category, setCategory] = useState(filters.category || '');
  const [faculty, setFaculty] = useState(filters.faculty || '');
  const [allProducts, setAllProducts] = useState(products.data || []);
  const [page, setPage] = useState(products.current_page);
  const [lastPage, setLastPage] = useState(products.last_page);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Actualiza los filtros en la URL y backend para admin
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(route('admin.products.index'), {
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
    setLastPage(products.last_page);
  }, [products]);

  // Cargar más productos para paginación
  const loadMoreProducts = async () => {
  if (page >= lastPage) return;

  const nextPage = page + 1;

  try {
    const response = await fetch(`/admin/products?page=${nextPage}&search=${search}&category=${category}&faculty=${faculty}`);
    const data = await response.json();

    setAllProducts(prev => [...prev, ...data.data]);
    setPage(data.current_page);
    setLastPage(data.last_page);
  } catch (error) {
    console.error('Error cargando más productos:', error);
  }
};

  // Función para eliminar producto (solo admin)
  const handleDelete = async (productId: number) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    setLoadingId(productId);

    try {
      await fetch(route('admin.products.destroy', productId), {
        method: 'DELETE',
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
      });

      setAllProducts(prev => prev.filter(product => product.id !== productId));
    } catch (error) {
      alert('Error eliminando el producto');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Administrar productos" />

      <div className="p-6 relative">
        <TextLink
          href={route("products.create")}
          className="absolute right-4 inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-3 rounded no-underline"
        >
          <PlusIcon className="h-4 w-4" />
          Vender
        </TextLink>

        <h1 className="text-2xl font-bold text-black-600 mb-1">Administrar productos</h1>
        <p className="text-gray-500 mb-4">Lista completa de productos en la plataforma</p>

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
          <ProductGridAdmin
            products={allProducts}
            userId={0} // admin ve todos, no es necesario filtrar por userId
            loadingId={loadingId}
            setLoadingId={setLoadingId}
            showLoadMore={page < lastPage}
            onLoadMore={loadMoreProducts}
            onDelete={handleDelete} // necesitarás agregar esta prop en ProductGrid
            showDeleteButton //
          />
        )}
      </div>

      {page < lastPage && (
        <button
            onClick={loadMoreProducts}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
            Cargar más productos
        </button>
        )}
    </AppLayout>
  );
}
