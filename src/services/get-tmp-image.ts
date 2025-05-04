export const getTmpImageUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const respose = await fetch(`https://fran-cloud.fdiez86.workers.dev/api/v1/upload`, {
    headers: {
      Authorization: `f8e2a97b4c3d6e5f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7`,
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
