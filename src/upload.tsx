import { Upload as UploadIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getTmpImageUrl } from './services/get-tmp-image';
import { useTicketStore } from './store/useTicketStore';

const SUPPORTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export const Upload = () => {
  const { setTicket, setLoading } = useTicketStore();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      alert('Por favor selecciona una imagen en formato JPG, PNG o WEBP');
      return;
    }

    setLoading(true);
    try {
      setError(null);
      const ticketData = await getTmpImageUrl(file);
      setTicket(ticketData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Se ha producido un error al subir la imagen');
      }
    } finally {
      setLoading(false);
      fileInputRef.current!.value = '';
    }
  };

  useEffect(() => {
    setError(null);
    setLoading(false);
  }, []);

  return (
    <section className="border border-neutral-300 rounded-xl p-4 mt-4 flex flex-col gap-4">
      <button className="btn flex items-center" onClick={() => fileInputRef.current?.click()}>
        <UploadIcon className="size-8 text-gray-400" />
        <span className="text-sm text-gray-500 ">Selecciona y sube tu ticket</span>
      </button>
      <p className="text-sm text-center text-gray-400">Formatos soportados: JPG, PNG, WEBP</p>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <input
        autoComplete="off"
        id="receipt-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
      />
    </section>
  );
};
