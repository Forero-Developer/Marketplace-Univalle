import { useForm } from '@inertiajs/react';
import { FormEvent, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface ModificarProductoProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    faculty: string;
  };
}

export default function ModificarProducto({ product }: ModificarProductoProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    condition: product.condition,
    faculty: product.faculty,
  });

  // Estado local para mostrar el precio formateado con puntos
  const [displayPrice, setDisplayPrice] = useState(
    product.price ? product.price.toLocaleString('es-CO') : ''
  );

  // Sincronizar displayPrice si cambia data.price desde fuera (por ejemplo, reset)
  useEffect(() => {
    setDisplayPrice(data.price ? data.price.toLocaleString('es-CO') : '');
  }, [data.price]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo números, quitar todo lo que no sea dígito
    const rawValue = e.target.value.replace(/\D/g, '');

    // Formatear con separadores de miles
    const formattedValue = rawValue ? parseInt(rawValue, 10).toLocaleString('es-CO') : '';

    setDisplayPrice(formattedValue);

    // Actualizar el valor numérico en el formulario
    setData('price', rawValue ? parseInt(rawValue, 10) : 0);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Mis productos', href: route('misProductos.index') },
    { title: 'Modificar producto', href: '#' },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    put(route('products.update', product.id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-white px-12 py-12"
      >
        <div className="relative w-full max-w-3xl p-8 bg-white border border-gray-200 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">Modificar producto</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold">Nombre del producto</label>
              <input
                type="text"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className="input w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div>
              <label className="block font-semibold">Descripción</label>
              <textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className="input w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
            </div>

            <div>
              <label className="block font-semibold">Precio</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none">$</span>
                <input
                  type="number"
                  value={displayPrice}
                  onChange={handlePriceChange}
                  className="input w-full border border-gray-300 rounded-lg px-7 py-2"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label="Precio en pesos colombianos"
                />
              </div>
              {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Categoría</label>
                <select
                  value={data.category}
                  onChange={e => setData('category', e.target.value)}
                  className="input w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Electronicos">Electrónicos</option>
                  <option value="Libros">Libros</option>
                  <option value="Comida">Comida</option>
                  <option value="Otros">Otros</option>
                </select>
                {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
              </div>

              <div>
                <label className="block font-semibold">Estado</label>
                <select
                  value={data.condition}
                  onChange={e => setData('condition', e.target.value)}
                  className="input w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
                >
                  <option value="">Selecciona el estado</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Usado">Usado</option>
                </select>
                {errors.condition && <span className="text-red-500 text-sm">{errors.condition}</span>}
              </div>
            </div>

            <div>
              <label className="block font-semibold">Facultad</label>
              <select
                value={data.faculty}
                onChange={e => setData('faculty', e.target.value)}
                className="input w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
              >
                <option value="">Selecciona la facultad</option>
                <option value="Ingeniería">Ingeniería</option>
                <option value="Medicina">Medicina</option>
                <option value="Derecho">Derecho</option>
                <option value="Ciencias Sociales">Ciencias Sociales</option>
                <option value="Artes">Artes</option>
                <option value="Otra">Otra</option>
              </select>
              {errors.faculty && <span className="text-red-500 text-sm">{errors.faculty}</span>}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={processing}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full transition"
            >
              Guardar cambios
            </motion.button>
          </form>
        </div>
      </motion.div>
    </AppLayout>
  );
}
