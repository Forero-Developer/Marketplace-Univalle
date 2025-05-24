interface FiltersBarProps {
    search: string;
    category: string;
    faculty: string;
    onSearchChange: (val: string) => void;
    onCategoryChange: (val: string) => void;
    onFacultyChange: (val: string) => void;
    categories: string[];
    faculties: string[];
  }
  
  export default function FiltersBar({
    search,
    category,
    faculty,
    onSearchChange,
    onCategoryChange,
    onFacultyChange,
    categories,
    faculties
  }: FiltersBarProps) {
    return (
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        />
  
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        >
          <option value="">Todas las categorías</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
  
        <select
          value={faculty}
          onChange={(e) => onFacultyChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        >
          <option value="">Todas las facultades</option>
          {faculties.map(fac => <option key={fac} value={fac}>{fac}</option>)}
        </select>
      </div>
    );
  }
  