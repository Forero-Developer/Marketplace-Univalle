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
      {/* Search Input and Selects */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            // Make search input full width on small screens, flex-grow on medium+
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Category and Faculty Selects */}
        {/* On small screens, these will stack due to parent flex-col. On md+, they'll be side-by-side. */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            // Make selects full width on small screens, adjust on sm+
            className="px-4 py-2 w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
            // Make selects full width on small screens, adjust on sm+
            className="px-4 py-2 w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

      {/* Category Filter Buttons */}
      <div className="bg-gray-100 rounded-lg p-2 overflow-x-auto custom-scrollbar"> {/* Added custom-scrollbar for styling */}
        <div className="flex space-x-4 sm:space-x-6 justify-start sm:justify-center"> {/* Adjusted spacing and alignment */}
          <button
            onClick={() => onCategoryChange("")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-200 ${
              category === "" ? "bg-red-500 text-white shadow-sm" : "text-gray-600 hover:text-red-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-200 ${
                category === cat ? "bg-red-500 text-white shadow-sm" : "text-gray-600 hover:text-red-600 hover:bg-gray-200"
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