"use client"

import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { Head, router } from "@inertiajs/react"
import TextLink from "@/components/text-link"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import FiltersBar from "@/components/marketplace/FiltersBar"
import ProductGrid from "@/components/marketplace/ProductGrid"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  condition: string
  faculty: string
  images: string[]
  user_id: number
  user: {
    id: number
    name: string
  }
  isFavorited?: boolean
}

interface Props {
  products: {
    data: Product[]
    current_page: number
    last_page: number
  }
  userId: number
  filters: {
    search: string
    category: string
    faculty: string
  }
  allCategories: string[]
  allFaculties: string[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Inicio",
    href: "/dashboard",
  },
]

export default function Dashboard({ products, userId, filters, allCategories, allFaculties }: Props) {
  const [search, setSearch] = useState(filters.search || "")
  const [category, setCategory] = useState(filters.category || "")
  const [faculty, setFaculty] = useState(filters.faculty || "")
  const [allProducts, setAllProducts] = useState(products.data || [])
  const [page, setPage] = useState(products.current_page)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [lastPage, setLastPage] = useState(products.last_page)

  // Actualiza los filtros en la URL y en el backend
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route("dashboard"),
        {
          search,
          category,
          faculty,
        },
        {
          preserveState: true,
          replace: true,
        },
      )
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [search, category, faculty])

  // Actualiza productos si cambian desde backend
  useEffect(() => {
    setAllProducts(products.data)
    setPage(products.current_page)
    setLastPage(products.last_page)
  }, [products])

  // Función para manejar el toggle favorito y actualizar el estado local
  function handleToggleFavorite(productId: number, favorited: boolean) {
    setAllProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === productId ? { ...product, isFavorited: favorited } : product)),
    )
  }

  // Cargar más productos para paginación
  const loadMoreProducts = async () => {
    const nextPage = page + 1
    const params = new URLSearchParams({
      page: String(nextPage),
      search,
      category,
      faculty,
    })

    const response = await fetch(`/api/products/load-more?${params.toString()}`)
    const data = await response.json()

    setAllProducts((prev) => [...prev, ...data.data])
    setPage(data.current_page)
    setLastPage(data.last_page)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="min-h-screen bg-gray-50">
        {/* Container principal con padding responsive */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            {/* Header con botón - Layout responsive */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6">
              {/* Título y descripción */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Marketplace Univalle
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
                  Compra y vende productos dentro de la comunidad universitaria.
                </p>
              </div>

              {/* Botón Vender - Responsive */}
              <div className="flex-shrink-0">
                <TextLink
                  href={route("products.create")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-200 no-underline w-full sm:w-auto"
                >
                  <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Vender Producto</span>
                </TextLink>
              </div>
            </div>

            {/* Barra de filtros */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <FiltersBar
                search={search}
                category={category}
                faculty={faculty}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
                onFacultyChange={setFaculty}
                categories={allCategories}
                faculties={allFaculties}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {allProducts.length === 0 ? (
              /* Estado vacío mejorado */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <PlusIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    No se encontraron productos
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                    Intenta ajustar los filtros o sé el primero en publicar un producto.
                  </p>
                  <TextLink
                    href={route("products.create")}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 no-underline"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Publicar Producto
                  </TextLink>
                </div>
              </div>
            ) : (
              /* Grid de productos */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                <ProductGrid
                  products={allProducts || []}
                  userId={userId}
                  loadingId={loadingId}
                  setLoadingId={setLoadingId}
                  showLoadMore={page < lastPage}
                  onLoadMore={loadMoreProducts}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            )}
          </div>
        </div>

        {/* Botón flotante para móviles (opcional) */}
        <div className="fixed bottom-6 right-6 sm:hidden z-50">
          <TextLink
            href={route("products.create")}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-200 no-underline"
          >
            <PlusIcon className="h-6 w-6" />
          </TextLink>
        </div>
      </div>
    </AppLayout>
  )
}
