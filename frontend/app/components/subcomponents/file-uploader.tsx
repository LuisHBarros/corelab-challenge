export function FileUploader() {
  return (
    <>
      <p className="text-sm text-gray-500">
        Clique ou arraste o arquivo para esta área para fazer upload
      </p>
      <input type="file" className="hidden" />
    </>
  );
}
