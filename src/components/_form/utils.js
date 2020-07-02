export const getErrors = (errors, setError) => {
  errors.forEach((item) => {
    setError(item.field, { message: item.message });
  });
};
