export const createMultiFileUploadHandler = (
  upload,
  { onAfterUpload, onBeforeUpload, onCompleted, onError, onStart }
) => {
  const uploadImage = async (files, idx) => {
    if (files.length > idx) {
      try {
        if (onBeforeUpload) {
          onBeforeUpload(idx, files);
        }

        await upload(files[idx], idx);

        if (onAfterUpload) {
          onAfterUpload(idx, files);
        }
      } catch (exception) {
        console.error(`Could not upload file #${idx + 1}. Reason: ${exception}`);
        if (onError) {
          onError(idx, files);
        }
      } finally {
        await uploadImage(files, idx + 1);
      }
    }
  };

  return async (rawFiles) => {
    const files = Array.from(rawFiles);

    if (onStart) {
      onStart(files);
    }

    await uploadImage(files, 0);

    if (onCompleted) {
      onCompleted(files);
    }
  };
};
