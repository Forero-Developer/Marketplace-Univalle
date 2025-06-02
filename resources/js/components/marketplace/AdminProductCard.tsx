import { Edit, Trash2, LoaderCircle } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Product } from '@/types/product';

interface AdminProductCardProps {
  product: Product;
  loadingId: number | null;
  setLoadingId: (id: number | null) => void;
  onDelete: (id: number) => void;
}

export default function AdminProductCard({
  product,
  loadingId,
  setLoadingId,
  onDelete,
}: AdminProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteConfirmed = () => {
    setLoadingId(product.id);
    if (onDelete) {
      onDelete(product.id);
    } else {
      router.delete(route('products.destroy', product.id), {
        onFinish: () => setLoadingId(null),
      });
    }
  };

  const handleEdit = () => {
    router.get(route('products.edit', product.id));
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 min-w-[250px] sm:min-w-0 h-full flex flex-col">
        <div className="relative">
          {product.images.length > 0 && (
            <img
              src={`/storage/${product.images[0]}`}
              alt={`${product.name}`}
              className="w-full aspect-[4/3] object-cover transition-all duration-300 ease-in-out"
            />
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
            <p className="text-2xl font-bold text-red-600 mb-4">
              ${new Intl.NumberFormat('es-ES').format(product.price)}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
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
          </div>
        </div>
      </div>

      {/* Diálogo de confirmación con mismo estilo que ProductCard */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black/80
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0"
          aria-hidden="true"
        />
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 z-10">
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
