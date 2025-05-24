import TextLink from '@/components/text-link';
import { useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function CreateProduct() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    faculty: '',
    images: [] as File[] ,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
  
      // Validar que solo sean imágenes jpeg, png o jpg
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const invalidFiles = filesArray.filter(file => !validTypes.includes(file.type));
  
      if (invalidFiles.length > 0) {
        alert('Solo puedes subir imágenes en formato JPEG, PNG o JPG.');
        return; // Detener el proceso si hay archivos inválidos
      }
  
      setData('images', filesArray);
      const previews = filesArray.map(file => URL.createObjectURL(file));
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
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-12 py-12"
    >
      <div className="relative w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl">
        <div className="absolute top-4 right-4">
          <TextLink href={route('dashboard')}>
            <LogOut />
          </TextLink>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">Publicar producto</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-semibold">Nombre del producto</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className="input w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold">Descripción</label>
            <textarea
              name="description"
              id="description"
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              className="input w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="price" className="block font-semibold">Precio</label>
            <input
              type="number"
              name="price"
              id="price"
              value={data.price}
              onChange={e => setData('price', e.target.value)}
              className="input w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block font-semibold">Categoría</label>
              <select
                name="category"
                id="category"
                value={data.category}
                onChange={e => setData('category', e.target.value)}
                className="input w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Libros">Libros</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="condition" className="block font-semibold">Estado</label>
              <select
                name="condition"
                id="condition"
                value={data.condition}
                onChange={e => setData('condition', e.target.value)}
                className="input w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
              >
                <option value="">Selecciona el estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Como nuevo">Como nuevo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="faculty" className="block font-semibold">Facultad</label>
            <select
              name="faculty"
              id="faculty"
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
          </div>

          <div>
            <label htmlFor="images" className="block font-semibold">Imágenes</label>
            <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-gray-50">
              <input
                type="file"
                name="images"
                id="images"
                multiple
                onChange={handleImageChange}
                className="w-full cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-2">Puedes subir varias imágenes del producto</p>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      className="h-24 w-full object-cover rounded shadow"
                    />
                  ))}
                </div>
              )}
            </div>
            {errors.images && <span className="text-red-500 text-sm">{errors.images}</span>}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={processing}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full transition"
          >
            Publicar
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
