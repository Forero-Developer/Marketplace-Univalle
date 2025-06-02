import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  userId: number;
  loadingId: number | null;
  setLoadingId: (id: number | null) => void;
  showLoadMore: boolean;
  onLoadMore: () => void;
  onToggleFavorite: (productId: number, favorited: boolean) => void;
}

export default function ProductGrid({
  products = [],
  userId,
  loadingId,
  setLoadingId,
  showLoadMore,
  onLoadMore,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={userId}
            loadingId={loadingId}
            setLoadingId={setLoadingId}
            isFavorited={product.isFavorited}
            onToggleFavorite={onToggleFavorite}
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
