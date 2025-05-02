import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface ProductCardProps {
  product: {
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
  };
  currentUserId: number;
  loadingId: number | null;
  setLoadingId: (id: number | null) => void;
}

export default function ProductCard({
  product,
  currentUserId,
  loadingId,
  setLoadingId,
}: ProductCardProps) {
  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setLoadingId(product.id);
      router.delete(route('products.destroy', product.id), {
        onFinish: () => setLoadingId(null),
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
  
  {/* Sección de imagen con botón superpuesto */}
  <div className="relative">
    {product.images.length > 0 && (
      <img
        src={`/storage/${product.images[0]}`}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
    )}
    
    {/* Botón de eliminar (posicionado en la esquina superior derecha) */}
    {product.user_id === currentUserId && (
      <button
        onClick={handleDelete}
        disabled={loadingId === product.id}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
      >
        {loadingId === product.id && (
          <LoaderCircle className="animate-spin w-5 h-5" />
        )}
        {!loadingId && <span className="sr-only">Eliminar</span>}
      </button>
    )}
  </div>
  
  {/* Contenido de la tarjeta */}
  <div className="p-4">
    {/* Título del producto */}
    <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h2>
    
    {/* Categoría y condición en una línea con punto separador */}
    <div className="flex items-center text-sm text-gray-600 mb-1">
      <span>{product.faculty}</span>
      <span className="mx-1">•</span>
      <span>{product.condition}</span>
    </div>
    
    {/* Información del vendedor */}
    <p className="text-sm text-gray-600 mb-2">Vendedor: {product.user.name}</p>
    
    {/* Precio destacado */}
    <p className="text-xl font-bold text-red-600 mb-4">${product.price}</p>
    
    {/* Botones de acción */}
    <div className="flex gap-2">
      <button className="flex items-center justify-center gap-1 border border-gray-300 rounded py-2 px-4 text-gray-700 hover:bg-gray-50 flex-1">
        <span>Contactar</span>
      </button>
      <button className="flex items-center justify-center gap-1 bg-red-600 text-white rounded py-2 px-4 hover:bg-red-700 flex-1">
        <span>Añadir</span>
      </button>
    </div>
  </div>
</div>
  );
}
