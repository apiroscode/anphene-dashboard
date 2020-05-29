export const validationResolver = async (data, schema) => {
  try {
    const values = await schema.validate(data, {
      abortEarly: false,
    });

    return {
      values,
      errors: {},
    };
  } catch (errors) {
    return {
      values: {},
      errors: errors.inner.reduce(
        (allErrors, currentError) => ({
          ...allErrors,
          [currentError.path]: {
            type: currentError.type ?? "validation",
            message: currentError.message,
          },
        }),
        {}
      ),
    };
  }
};

export const getErrors = (errors) => {
  return errors.map((item) => ({
    name: item.field,
    message: item.message,
  }));
};
