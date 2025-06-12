import QrCodeActualUrl from '@/components/marketplace/CodigoQr';
import QrScanner from '@/components/marketplace/QrScanner';
import { router } from '@inertiajs/react';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, MessageCircle, QrCode, User } from 'lucide-react';
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
    qr_code: string;
    user_id: number;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface ProductDetailProps {
    product: Product;
}

export default function InfoProducts({ product }: ProductDetailProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleContact = () => {
        router.post(route('conversations.start', product.id));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const [showScanner, setShowScanner] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header con botón de regreso */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
                    <button onClick={() => router.visit(route('dashboard'))} className="rounded-full p-2 transition-colors hover:bg-gray-100">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="truncate text-lg font-semibold text-gray-900">{product.name}</h1>
                </div>
            </div>

            <div className="mx-auto max-w-4xl space-y-6 p-4">
                {/* Galería de imágenes */}
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="relative">
                        {product.images.length > 0 ? (
                            <>
                                <img
                                    src={`/storage/${product.images[currentImageIndex]}`}
                                    alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                                    className="h-64 w-full bg-gray-100 object-contain md:h-80"
                                />
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                                            className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-white"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                                            className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-white"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
                                            {product.images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`h-2 w-2 rounded-full transition-all ${
                                                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex h-64 w-full items-center justify-center bg-gray-200 md:h-80">
                                <span className="text-gray-500">Sin imagen</span>
                            </div>
                        )}
                    </div>

                    {/* Información principal */}
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 uppercase md:text-3xl">{product.name}</h1>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleContact}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 font-semibold text-gray-700 transition-all duration-200 hover:from-gray-200 hover:to-gray-100 hover:shadow-md"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            <span className="text-sm">Contactar</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                        {product.faculty}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                        {product.condition}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-red-600 md:text-4xl">${new Intl.NumberFormat('es-ES').format(product.price)}</div>
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                                <div className="flex flex-1 items-center gap-2">
                                    <User className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="font-medium text-gray-900 uppercase">VENDEDOR</p>
                                        <p className="text-sm text-gray-600 uppercase">{product.user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{formatDate(product.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Descripción del producto */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Descripción</h2>
                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{product.description || 'Sin descripción disponible.'}</p>
                </div>

                {/* Código QR y detalles adicionales */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow-md md:p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <QrCode className="h-5 w-5" />
                            <h2 className="text-xl font-semibold">Código QR</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="rounded-lg bg-white p-2">
                            <QrCodeActualUrl product={product} />
                          </div>

                          <button
                            onClick={() => setShowScanner((prev) => !prev)}
                            className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                          >
                            {showScanner ? 'Cerrar Escáner QR' : 'Escanear QR'}
                          </button>

                          {showScanner && <QrScanner />}
                        </div>
                        <p className="mt-3 text-center text-sm text-gray-600">Escanea para ver este producto</p>
                    </div>

                    {/* Información adicional */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold">Detalles</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">ID del producto</span>
                                <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">#{product.id}</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Fecha de publicación</span>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{formatDate(product.created_at)}</span>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Vendedor ID</span>
                                <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">#{product.user_id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
