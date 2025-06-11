import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
  LoaderCircle,
  Heart,
  MessageCircle,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  Eye,
  User,
  Tag,
  GraduationCap,
  Package,
} from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false)

  const images = Array.isArray(product.images) ? product.images : []
  const hasImages = images.length > 0

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

  const handleViewDetails = () => {
  router.get(route('infoProducts', product.id));
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
      <div
        className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 min-w-[280px] sm:min-w-0 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 ${
          isHovered ? "shadow-xl" : "shadow-lg"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen con overlay gradient */}
        <div className="relative overflow-hidden">
          {hasImages ? (
            <>
              <div className="relative">
                <img
                  src={`/storage/${images[currentImageIndex]}`}
                  alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                  className="w-full aspect-[4/3] object-cover bg-gradient-to-br from-gray-50 to-gray-100 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/60 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Favorite button */}
          {product.user_id !== currentUserId && (
            <button
              onClick={toggleFavorite}
              disabled={togglingFavorite}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm shadow-lg transition-all duration-200 ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600 hover:scale-110"
                  : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 hover:scale-110"
              }`}
              aria-label="Agregar a favoritos"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""} transition-all duration-200`} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {product.name}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200">
              <GraduationCap className="w-3 h-3" />
              {product.faculty}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200">
              <Package className="w-3 h-3" />
              {product.condition}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200">
              <Tag className="w-3 h-3" />
              {product.category}
            </span>
          </div>

          {/* Seller info */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Vendedor</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{product.user.name}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              ${new Intl.NumberFormat("es-ES").format(product.price)}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-auto space-y-3">
            {product.user_id !== currentUserId ? (
              <>
                {/* Primary actions */}
                <div className="flex gap-2">
                  <button
                    onClick={handleContact}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-semibold rounded-xl py-3 px-4 hover:from-gray-200 hover:to-gray-100 hover:shadow-md transition-all duration-200 border border-gray-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Contactar</span>
                  </button>

                  <button
                    onClick={handleViewDetails}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl py-3 px-4 hover:from-gray-800 hover:to-gray-900 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Ver más</span>
                  </button>

                </div>
              </>
            ) : (
              <>
                {/* Owner actions */}
                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={handleViewDetails}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl py-3 px-4 hover:from-gray-800 hover:to-gray-900 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Ver más</span>
                  </button>

                  <button
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-xl py-3 px-4 hover:from-blue-100 hover:to-blue-200 hover:shadow-md transition-all duration-200 border border-blue-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button
                    onClick={() => setModalOpen(true)}
                    disabled={loadingId === product.id}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 font-semibold rounded-xl py-3 px-4 hover:from-red-100 hover:to-red-200 hover:shadow-md transition-all duration-200 border border-red-200 disabled:opacity-50"
                  >
                    {loadingId === product.id ? (
                      <LoaderCircle className="animate-spin w-4 h-4" />
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Eliminar</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modern Delete Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" aria-hidden="true" />

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-6 z-10 transform transition-all">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">¿Eliminar producto?</Dialog.Title>
            <Dialog.Description className="text-gray-600 leading-relaxed">
              Esta acción eliminará <span className="font-semibold">"{product.name}"</span> permanentemente. No podrás
              deshacer esta acción.
            </Dialog.Description>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleDeleteConfirmed()
                setModalOpen(false)
              }}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-200 transition-all duration-200"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
