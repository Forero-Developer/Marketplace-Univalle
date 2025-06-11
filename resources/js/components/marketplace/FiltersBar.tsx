"use client"

import { Search, Filter, X } from "lucide-react"
import { useState } from "react"

interface FiltersBarProps {
  search: string
  category: string
  faculty: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onFacultyChange: (value: string) => void
  categories: string[]
  faculties: string[]
}

export default function FiltersBar({
  search,
  category,
  faculty,
  onSearchChange,
  onCategoryChange,
  onFacultyChange,
  categories,
  faculties,
}: FiltersBarProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const clearFilters = () => {
    onSearchChange("")
    onCategoryChange("")
    onFacultyChange("")
  }

  const hasActiveFilters = search || category || faculty

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
        />
      </div>

      {/* Filtros desktop */}
      <div className="hidden sm:flex flex-wrap gap-3 lg:gap-4">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm bg-white min-w-[140px]"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={faculty}
          onChange={(e) => onFacultyChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm bg-white min-w-[140px]"
        >
          <option value="">Todas las facultades</option>
          {faculties.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 text-sm"
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Botón de filtros móvil */}
      <div className="sm:hidden flex items-center justify-between">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-sm font-medium"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {[search, category, faculty].filter(Boolean).length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 text-sm"
          >
            <X className="h-4 w-4" />
            Limpiar
          </button>
        )}
      </div>

      {/* Panel de filtros móvil */}
      {showMobileFilters && (
        <div className="sm:hidden space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={faculty}
            onChange={(e) => onFacultyChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
          >
            <option value="">Todas las facultades</option>
            {faculties.map((fac) => (
              <option key={fac} value={fac}>
                {fac}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
