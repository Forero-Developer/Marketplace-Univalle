import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { LogOut } from 'lucide-react';
import ProductCard from '@/components/marketplace/ProductCard';
import { useState, useMemo } from 'react';

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
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard({ products, userId }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [faculty, setFaculty] = useState('');
  const [page, setPage] = useState(products.current_page);
  const [allProducts, setAllProducts] = useState<Product[]>(products.data);

  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  const faculties = Array.from(new Set(allProducts.map(p => p.faculty)));

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      `${product.name} ${product.category} ${product.faculty}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category ? product.category === category : true) &&
      (faculty ? product.faculty === faculty : true)
    );
  }, [allProducts, search, category, faculty]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    const response = await fetch(`/api/products/load-more?page=${nextPage}`);
    const data: Product[] = await response.json();

    if (data.length > 0) {
      setAllProducts(prev => [...prev, ...data]);
      setPage(nextPage);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="absolute top-4 right-4">
        <TextLink href={route('products.create')}>
          <LogOut />
        </TextLink>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Productos publicados</h1>

        {/* Filtros */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 border rounded-xl bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 border rounded-xl bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-red-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="w-full px-4 py-2 border rounded-xl bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-red-500"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          >
            <option value="">Todas las facultades</option>
            {faculties.map((fac) => (
              <option key={fac} value={fac}>{fac}</option>
            ))}
          </select>
        </div>

        {/* Productos */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
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

        {/* Botón de "Cargar más" solo si aún hay más productos en el servidor */}
        {page < products.last_page && (
          <button
            onClick={loadMoreProducts}
            className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:outline-none"
          >
            Cargar más productos
          </button>
        )}
      </div>
    </AppLayout>
  );
}
