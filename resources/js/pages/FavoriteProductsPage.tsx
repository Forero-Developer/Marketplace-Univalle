import ProductGrid from '@/components/marketplace/ProductGrid';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
    isFavorited: boolean;
}

interface FavoriteProductsPageProps {
    products: Product[]; // ✅ Ahora se alinea con el controlador
    userId: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
    },
    {
        title: 'Mis Favoritos',
        href: '/mis-productos',
    },
];

export default function FavoriteProductsPage({ products, userId }: FavoriteProductsPageProps) {
    const [productList, setProductList] = useState(products);

    const handleToggleFavorite = (productId: number, favorited: boolean) => {
        if (!favorited) {
            // Remover producto de la lista si se quita favorito
            setProductList((prev) => prev.filter((p) => p.id !== productId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis productos" />

            <div className="bg-gray-50 p-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-5 sm:text-3xl lg:text-4xl">Mis Favoritos</h1>

                {productList.length === 0 ? (
                    <p className="text-gray-500">No tienes favoritos.</p>
                ) : (
                    <ProductGrid
                        products={productList}
                        userId={userId}
                        loadingId={null}
                        setLoadingId={() => {}}
                        showLoadMore={false}
                        onLoadMore={() => {}}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
            </div>
        </AppLayout>
    );
}
