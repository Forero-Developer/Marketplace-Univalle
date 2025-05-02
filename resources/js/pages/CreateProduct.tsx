import TextLink from '@/components/text-link';
import { useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { ChangeEvent, FormEvent } from 'react';

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setData('images', Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('products.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <div className='absolute top-4 right-4 '>
                    <TextLink href={route('dashboard')}>
                        <LogOut/>  
                    </TextLink>
    </div>
      
      <h2 className="text-2xl font-bold mb-4 text-red-600">Publicar producto</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre Del Producto</label>
          <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="input" />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <label className="block font-semibold">Descripción</label>
          <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="input" />
        </div>

        <div>
          <label className="block font-semibold">Precio</label>
          <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="input" />
          {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
        </div>

        <div>
          <label className="block font-semibold">Categoría</label>
          <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} className="input" />
        </div>

        <div>
          <label className="block font-semibold">Estado</label>
          <input type="text" value={data.condition} onChange={e => setData('condition', e.target.value)} className="input" />
        </div>

        <div>
          <label className="block font-semibold">Facultad</label>
          <input type="text" value={data.faculty} onChange={e => setData('faculty', e.target.value)} className="input" />
        </div>

        <div>
          <label className="block font-semibold">Imágenes</label>
          <input type="file" multiple onChange={handleImageChange} className="input" />
          {errors.images && <span className="text-red-500 text-sm">{errors.images}</span>}
        </div>

        <button type="submit" disabled={processing} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Publicar
        </button>
      </form>
    </div>
  );
}
