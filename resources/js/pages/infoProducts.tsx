import { useState } from "react"
import {

  Calendar,
  User,
  QrCode,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { router } from "@inertiajs/react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  condition: string
  faculty: string
  images: string[]
  qr_code: string
  user_id: number
  created_at: string
  user: {
    id: number
    name: string
  }
}

interface ProductDetailProps {
  product: Product
}

export default function InfoProducts({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con botón de regreso */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.visit(route('dashboard'))} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Galería de imágenes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            {product.images.length > 0 ? (
              <>
                <img
                  src={`/storage/${product.images[currentImageIndex]}`}
                  alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                  className="w-full h-64 md:h-80 object-contain bg-gray-100"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
          </div>

          {/* Información principal */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
                  {product.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {product.faculty}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {product.condition}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-red-600">
                ${new Intl.NumberFormat("es-ES").format(product.price)}
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 flex-1">
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Descripción</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {product.description || "Sin descripción disponible."}
          </p>
        </div>

        {/* Código QR y detalles adicionales */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Código QR */}
          {product.qr_code && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Código QR</h2>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border">
                  <img src={`/storage/${product.qr_code}`} alt="Código QR del producto" className="w-48 h-48" />
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-3">Escanea para ver este producto</p>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Detalles</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ID del producto</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">#{product.id}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fecha de publicación</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{formatDate(product.created_at)}</span>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vendedor ID</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">#{product.user_id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
