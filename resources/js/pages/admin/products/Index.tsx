"use client"

import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import { Head, router } from '@inertiajs/react'
import TextLink from '@/components/text-link'
import { PlusIcon, ClipboardList } from 'lucide-react'
import { useEffect, useState } from 'react'
import FiltersBar from '@/components/marketplace/FiltersBar'
import ProductGridAdmin from '@/components/marketplace/ProductGridAdmin'

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
  filters: {
    search: string
    category: string
    faculty: string
  }
  allCategories: string[]
  allFaculties: string[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Inicio', href: '/dashboard' },
  { title: 'Administrar productos', href: '/admin/products' },
]

export default function AdminProducts({
  products,
  filters,
  allCategories,
  allFaculties,
}: Props) {
  const [search, setSearch] = useState(filters.search || '')
  const [category, setCategory] = useState(filters.category || '')
  const [faculty, setFaculty] = useState(filters.faculty || '')
  const [allProducts, setAllProducts] = useState(products.data || [])
  const [page, setPage] = useState(products.current_page)
  const [lastPage, setLastPage] = useState(products.last_page)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route('admin.products.index'),
        { search, category, faculty },
        { preserveState: true, replace: true }
      )
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [search, category, faculty])

  useEffect(() => {
    setAllProducts(products.data)
    setPage(products.current_page)
    setLastPage(products.last_page)
  }, [products])

  // Cargar más productos para paginación
  const loadMoreProducts = async () => {
    if (page >= lastPage) return

    const nextPage = page + 1
    const params = new URLSearchParams({
      page: String(nextPage),
      search,
      category,
      faculty,
    })

    try {
      const response = await fetch(`/admin/products?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Error al cargar más productos')
      const data = await response.json()

      setAllProducts((prev) => [...prev, ...data.data])
      setPage(data.current_page)
      setLastPage(data.last_page)
    } catch (error) {
      console.error('Error cargando más productos:', error)
    }
  }

  const handleDelete = async (productId: number) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return

    setLoadingId(productId)

    try {
      await fetch(route('admin.products.destroy', productId), {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN':
            document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      })

      setAllProducts((prev) => prev.filter((product) => product.id !== productId))
    } catch {
      alert('Error eliminando el producto')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Administrar productos" />

      <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
        {/* Container principal con padding responsive */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
          {/* Botón Vender Producto en esquina superior derecha */}

<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6">
  {/* Título y descripción */}
  <div className="flex-1 min-w-0">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
      Administrar productos
    </h1>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
      Lista completa de productos en la plataforma
    </p>
  </div>

  {/* Contenedor de botones */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:mt-4">
    <TextLink
      href={route("admin.audit.index")}
      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-200 no-underline w-full sm:w-auto"
    >
      <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="text-sm sm:text-base">Auditoría</span>
    </TextLink>

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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 max-w-7xl">
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

          {/* Contenido productos */}
          <div className="space-y-6">
            {allProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <PlusIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  No se encontraron productos
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                  Ajusta los filtros o sé el primero en publicar un producto.
                </p>
                <TextLink
                  href={route('products.create')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 no-underline"
                >
                  <PlusIcon className="h-4 w-4" />
                  Publicar Producto
                </TextLink>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                <ProductGridAdmin
                  products={allProducts}
                  userId={0} // admin ve todos los productos
                  loadingId={loadingId}
                  setLoadingId={setLoadingId}
                  showLoadMore={page < lastPage}
                  onLoadMore={loadMoreProducts}
                  onDelete={handleDelete}
                  showDeleteButton
                />
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-6 right-6 sm:hidden z-50">
          <TextLink
            href={route("products.create")}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-200 no-underline">
            <PlusIcon className="h-6 w-6" />
          </TextLink>
        </div>
      </div>

    </AppLayout>
  )

  
}
