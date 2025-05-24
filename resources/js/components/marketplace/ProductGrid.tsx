import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    userId: number;
    loadingId: number | null;
    setLoadingId: (id: number | null) => void;
    showLoadMore: boolean;
    onLoadMore: () => void;
  }
  
  export default function ProductGrid({
    products,
    userId,
    loadingId,
    setLoadingId,
    showLoadMore,
    onLoadMore,
  }: ProductGridProps) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              currentUserId={userId}
              loadingId={loadingId}
              setLoadingId={setLoadingId}
            />
          ))}
        </div>
  
        {showLoadMore && (
          <button
            onClick={onLoadMore}
            className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:outline-none"
          >
            Cargar más productos
          </button>
        )}
      </>
    );
  }
  