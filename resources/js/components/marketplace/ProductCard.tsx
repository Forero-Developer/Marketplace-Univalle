import { useState } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setLoadingId(product.id);
      router.delete(route('products.destroy', product.id), {
        onFinish: () => setLoadingId(null),
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      {/* Imagen con carrusel */}
      <div className="relative">
        {product.images.length > 0 && (
          <>
            <img
              src={`/storage/${product.images[currentImageIndex]}`}
              alt={`${product.name} - imagen ${currentImageIndex + 1}`}
              className="w-full h-64 sm:h-80 object-cover transition-all duration-300 ease-in-out"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-gray-800 shadow-md hover:bg-red-500 hover:text-white transition-all"
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-gray-800 shadow-md hover:bg-red-500 hover:text-white transition-all"
                  aria-label="Imagen siguiente"
                >
                  ›
                </button>
              </>
            )}
          </>
        )}

        {/* Botón de eliminar */}
        {product.user_id === currentUserId && (
          <button
            onClick={handleDelete}
            disabled={loadingId === product.id}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all"
          >
            {loadingId === product.id ? (
              <LoaderCircle className="animate-spin w-5 h-5" />
            ) : (
              <span className="sr-only">Eliminar</span>
            )}
          </button>
        )}
      </div>

      {/* Detalles del producto */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1 uppercase tracking-tight">
          {product.name}
        </h2>

        {/* Facultad y condición */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="uppercase">{product.faculty}</span>
          <span className="mx-1">•</span>
          <span className="uppercase">{product.condition}</span>
        </div>

        {/* Vendedor */}
        <p className="uppercase text-sm text-gray-600 mb-2">
          <span className="font-semibold">Vendedor:</span > {product.user.name}
        </p>

        {/* Precio */}
        <p className="text-2xl font-bold text-red-600 mb-4">
          ${new Intl.NumberFormat('es-ES').format(product.price)}
        </p>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button className="flex-1 border border-gray-300 rounded py-2 px-4 text-gray-700 hover:bg-gray-100 transition-all">
            Contactar
          </button>
          <button className="flex-1 bg-red-600 text-white rounded py-2 px-4 hover:bg-red-700 transition-all">
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
