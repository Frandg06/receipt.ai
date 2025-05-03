export const getTmpImageUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const respose = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}&expiration=600`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!respose.ok) {
    throw new Error('Se ha producido un error al subir la imagen');
  }

  const { data } = await respose.json();

  if (!data || !data.url) {
    throw new Error('Se ha producido un error al subir la imagen');
  }

  return data.url;
};
