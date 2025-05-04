export const getTmpImageUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const respose = await fetch(`https://fran-cloud.fdiez86.workers.dev/api/v1/upload`, {
    headers: {
      Authorization: import.meta.env.VITE_IMAGE_API_KEY,
    },
    method: 'POST',
    body: formData,
  });

  if (!respose.ok) {
    throw new Error('Se ha producido un error al subir la imagen');
  }

  const data = await respose.json();

  if (!data || !data?.image?.url) {
    throw new Error('Se ha producido un error al subir la imagen');
  }

  return data.image.url;
};
