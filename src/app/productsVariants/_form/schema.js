import * as yup from "yup";

export const schema = yup.object().shape({
  sku: yup.string().required(),
  price: yup.number().required(),
  cost: yup.number().required(),
  weight: yup.number().required(),
  quantity: yup.number().required(),
});
