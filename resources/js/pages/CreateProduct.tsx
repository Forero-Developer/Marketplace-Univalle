import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function CreateProduct() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        category: '',
        condition: '',
        faculty: '',
        images: [] as File[],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Inicio', href: '/dashboard' },
        { title: 'Nuevo producto', href: route('misProductos.index') },
    ];

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // Estado local para mostrar el precio formateado con puntos
    const [displayPrice, setDisplayPrice] = useState('');

    // Sincronizar displayPrice si cambia data.price desde fuera (por ejemplo, reset)
    useEffect(() => {
        setDisplayPrice(data.price ? Number(data.price).toLocaleString('es-CO') : '');
    }, [data.price]);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Solo números, quitar todo lo que no sea dígito
        const rawValue = e.target.value.replace(/\D/g, '');

        // Formatear con separadores de miles
        const formattedValue = rawValue ? parseInt(rawValue, 10).toLocaleString('es-CO') : '';

        setDisplayPrice(formattedValue);

        // Actualizar el valor numérico en el formulario
        setData('price', rawValue ? rawValue : '');
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            // Validar que solo sean imágenes jpeg, png o jpg
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const invalidFiles = filesArray.filter((file) => !validTypes.includes(file.type));

            if (invalidFiles.length > 0) {
                alert('Solo puedes subir imágenes en formato JPEG, PNG o JPG.');
                return;
            }

            setData('images', filesArray);
            const previews = filesArray.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.images.length === 0) {
            alert('Debes seleccionar al menos una imagen del producto.');
            return;
        }

        post(route('products.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setImagePreviews([]);
                setDisplayPrice('');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-screen items-center justify-center bg-white px-12 py-12 pt-23 md:pt-0"
            >
                <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
                    <button
                        onClick={() => router.visit(route('dashboard'))}
                        className="absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-gray-100"
                        aria-label="Volver"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <h2 className="mb-6 text-center text-3xl font-bold text-red-600">Publicar producto</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block font-semibold">
                                Nombre del producto
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input w-full rounded-lg border border-gray-300 px-4 py-2"
                                required
                            />
                            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block font-semibold">
                                Descripción <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                placeholder="Breve descripcion"
                                onChange={(e) => setData('description', e.target.value)}
                                className="input w-full rounded-lg border border-gray-300 px-4 py-2"
                                required
                            />
                            {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block font-semibold">
                                Precio
                            </label>
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 select-none">$</span>
                                <input
                                    type="text"
                                    name="price"
                                    value={displayPrice}
                                    onChange={handlePriceChange}
                                    className="input w-full rounded-lg border border-gray-300 px-7 py-2"
                                    inputMode="numeric"
                                    pattern="[0-9.]*"
                                    maxLength={11}
                                    aria-label="Precio en pesos colombianos"
                                    required
                                />
                            </div>
                            {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="category" className="block font-semibold">
                                    Categoría
                                </label>
                                <select
                                    name="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="input w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2"
                                    required
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
                                <label htmlFor="condition" className="block font-semibold">
                                    Estado
                                </label>
                                <select
                                    name="condition"
                                    value={data.condition}
                                    onChange={(e) => setData('condition', e.target.value)}
                                    className="input w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2"
                                    required
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
                            <label htmlFor="faculty" className="block font-semibold">
                                Facultad
                            </label>
                            <select
                                name="faculty"
                                value={data.faculty}
                                onChange={(e) => setData('faculty', e.target.value)}
                                className="input w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2"
                                required
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

                        <div>
                            <label htmlFor="images" className="block font-semibold">
                                Imágenes
                            </label>
                            <div className="rounded-lg border border-dashed border-gray-400 bg-gray-50 p-4">
                                <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    onChange={handleImageChange}
                                    className="w-full cursor-pointer"
                                />
                                <p className="mt-2 text-sm text-gray-500">Puedes subir varias imágenes del producto</p>

                                {imagePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        {imagePreviews.map((src, index) => (
                                            <img key={index} src={src} alt={`preview-${index}`} className="h-24 w-full rounded object-cover shadow" />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.images && <span className="text-sm text-red-500">{errors.images}</span>}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                        >
                            Publicar
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </AppLayout>
    );
}
