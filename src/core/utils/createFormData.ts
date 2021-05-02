export default function createFormData(uri: string) {
  const formData = new FormData();

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

  return formData;
}
