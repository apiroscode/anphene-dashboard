export const getErrors = (errors, setError) => {
  errors.forEach((item) => {
    setError(item.field, { type: null, message: item.message });
  });
};
