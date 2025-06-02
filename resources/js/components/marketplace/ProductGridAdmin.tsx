// ProductGridAdmin.tsx
import { Product } from "@/types/product";
import AdminProductCard from "./AdminProductCard";

interface ProductGridAdminProps {
  products: Product[];
  loadingId: number | null;
  setLoadingId: (id: number | null) => void;
  showLoadMore: boolean;
  onLoadMore: () => void;
  onDelete: (id: number) => void;
  showDeleteButton?: boolean;
  userId?: number;
}

export default function ProductGridAdmin({
  products,
  loadingId,
  setLoadingId,
  showLoadMore,
  onLoadMore,
  onDelete,
}: ProductGridAdminProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            loadingId={loadingId}
            setLoadingId={setLoadingId}
            onDelete={onDelete}
          />
        ))}
      </div>

      {showLoadMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onLoadMore}
            className="w-full max-w-sm px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cargar más productos
          </button>
        </div>
      )}
    </>
  );
}
