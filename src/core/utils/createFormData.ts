export default function createImageFormData(uris: string | string[]) {
  const formData = new FormData();

  if (typeof uris === 'string') {
    uris = [uris];
  }

  uris.forEach((uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append(
      'image',
      ({
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as unknown) as Blob,
      `photo.${fileType}`,
    );
  });

  return formData;
}
