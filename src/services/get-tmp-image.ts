import { Receipt } from "../types/ticket";

export const getTmpImageUrl = async (file: File): Promise<Receipt> => {
  
  const formData = new FormData();
  formData.append('img', file);

  const respose = await fetch(import.meta.env.VITE_IMAGE_API_URL, {
    headers: {
      'X-API-KEY': import.meta.env.VITE_IMAGE_API_KEY,
    },
    method: 'POST',
    body: formData,
  });

  if (!respose.ok) {
    throw new Error('Se ha producido un error al subir la imagen');
  }

  const data = await respose.json();

  if (!data.response) {
    throw new Error('Se ha producido un error al subir la imagen');
  }
  
  return data.response;
};
