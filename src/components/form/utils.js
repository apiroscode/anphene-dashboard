export const getErrors = (errors) => {
  return errors.map((item) => ({
    name: item.field,
    message: item.message,
  }));
};
