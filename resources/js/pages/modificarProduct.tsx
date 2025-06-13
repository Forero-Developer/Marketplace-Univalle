import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

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
    const [displayPrice, setDisplayPrice] = useState(product.price ? product.price.toLocaleString('es-CO') : '');

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
                className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-12 pt-16 md:pt-0"
            >
                <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
                    {/* Botón posicionado en esquina superior derecha */}
                    <button
                        onClick={() => router.visit(route('dashboard'))}
                        className="absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-gray-100"
                        aria-label="Volver"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block font-semibold">Nombre del producto</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                        </div>

                        <div>
                            <label className="block font-semibold">Descripción</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="input w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                            {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block font-semibold">Precio</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none">$</span>
                                <input
                                type="text"
                                name="price"
                                value={displayPrice}
                                onChange={handlePriceChange}
                                className="input w-full border border-gray-300 rounded-lg px-7 py-2"
                                inputMode="numeric"
                                maxLength={11}
                                pattern="[0-9.]*"
                                aria-label="Precio en pesos colombianos"
                                required
                                />
                            </div>
                            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block font-semibold">Categoría</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="input w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    <option value="Electronicos">Electrónicos</option>
                                    <option value="Libros">Libros</option>
                                    <option value="Comida">Comida</option>
                                    <option value="Otros">Otros</option>
                                </select>
                                {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}
                            </div>

                            <div>
                                <label className="block font-semibold">Estado</label>
                                <select
                                    value={data.condition}
                                    onChange={(e) => setData('condition', e.target.value)}
                                    className="input w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2"
                                >
                                    <option value="">Selecciona el estado</option>
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Como nuevo">Como nuevo</option>
                                    <option value="Usado">Usado</option>
                                </select>
                                {errors.condition && <span className="text-sm text-red-500">{errors.condition}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold">Facultad</label>
                            <select
                                value={data.faculty}
                                onChange={(e) => setData('faculty', e.target.value)}
                                className="input w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2"
                            >
                                <option value="">Selecciona la facultad</option>
                                <option value="Ingeniería">Ingeniería</option>
                                <option value="Medicina">Medicina</option>
                                <option value="Derecho">Derecho</option>
                                <option value="Ciencias Sociales">Ciencias Sociales</option>
                                <option value="Artes">Artes</option>
                                <option value="Otra">Otra</option>
                            </select>
                            {errors.faculty && <span className="text-sm text-red-500">{errors.faculty}</span>}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                        >
                            Guardar cambios
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </AppLayout>
    );
}
