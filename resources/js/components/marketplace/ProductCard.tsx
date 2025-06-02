import { useState } from 'react';
import { router } from '@inertiajs/react';
import { LoaderCircle, Heart, MessageCircle, Trash2, Edit } from 'lucide-react';
import { Dialog } from '@headlessui/react';

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

interface ProductCardProps {
  product: Product;
  currentUserId: number;
  loadingId: number | null;
  setLoadingId: (id: number | null) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (productId: number, favorited: boolean) => void;
}

export default function ProductCard({
  product,
  currentUserId,
  loadingId,
  setLoadingId,
  isFavorited,
  onToggleFavorite,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [togglingFavorite, setTogglingFavorite] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteConfirmed = () => {
    setLoadingId(product.id);
    router.delete(route('products.destroy', product.id), {
      onFinish: () => setLoadingId(null),
    });
  };

  const handleEdit = () => {
    router.get(route('products.edit', product.id));
  };

  const handleContact = () => {
    router.post(route('conversations.start', product.id));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const toggleFavorite = async () => {
    if (togglingFavorite) return;
    setTogglingFavorite(true);
    try {
      const response = await fetch(route('favorites.toggle', product.id), {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const data = await response.json();
      setIsFavorite(data.favorited);

      if (onToggleFavorite) {
        onToggleFavorite(product.id, data.favorited);
      }
    } catch (error) {
      console.error('Error al cambiar favorito:', error);
    } finally {
      setTogglingFavorite(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 min-w-[250px] sm:min-w-0 h-full flex flex-col">
        <div className="relative">
          {product.images.length > 0 && (
            <>
              <img
                src={`/storage/${product.images[currentImageIndex]}`}
                alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                className="w-full aspect-[4/3] object-cover transition-all duration-300 ease-in-out"
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
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1 uppercase tracking-tight">
              {product.name}
            </h2>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="uppercase">{product.faculty}</span>
              <span className="mx-1">•</span>
              <span className="uppercase">{product.condition}</span>
            </div>
            <p className="uppercase text-sm text-gray-600 mb-2">
              <span className="font-semibold">Vendedor:</span> {product.user.name}
            </p>
            <p className="text-2xl font-bold text-red-600 mb-4">
              ${new Intl.NumberFormat('es-ES').format(product.price)}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            {product.user_id !== currentUserId && (
              <>
                <button
                  onClick={handleContact}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium rounded-full py-2 px-4 hover:bg-gray-200 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contactar</span>
                </button>
                <button
                  onClick={toggleFavorite}
                  disabled={togglingFavorite}
                  className={`flex items-center justify-center rounded-full p-2 transition-all ${
                    isFavorite
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Agregar a favoritos"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                </button>
              </>
            )}

            {product.user_id === currentUserId && (
              <>
                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-medium rounded-full py-2 px-4 hover:bg-blue-200 transition-all"
                >
                  <Edit className="w-5 h-5" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  disabled={loadingId === product.id}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 font-medium rounded-full py-2 px-4 hover:bg-red-200 transition-all"
                >
                  {loadingId === product.id ? (
                    <LoaderCircle className="animate-spin w-5 h-5" />
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      <span>Eliminar</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
          <Dialog.Title className="text-lg font-semibold text-red-600">¿Eliminar producto?</Dialog.Title>
          <Dialog.Description className="text-gray-600">
            Esta acción eliminará el producto permanentemente. ¿Deseas continuar?
          </Dialog.Description>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleDeleteConfirmed();
                setModalOpen(false);
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
