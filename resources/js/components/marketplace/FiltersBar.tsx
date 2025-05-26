import { Search } from "lucide-react"

interface FiltersBarProps {
  search: string
  category: string
  faculty: string
  onSearchChange: (val: string) => void
  onCategoryChange: (val: string) => void
  onFacultyChange: (val: string) => void
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
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Todas las facultades</option>
            {faculties.map((fac) => (
              <option key={fac} value={fac}>
                {fac}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-2 overflow-x-auto">
        <div className="flex space-x-6 justify-center">
          <button
            onClick={() => onCategoryChange("")}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              category === "" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Todos
          </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  category === cat ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {cat}
      </button>
          ))}
        </div>
      </div>
    </div>
  )
}
