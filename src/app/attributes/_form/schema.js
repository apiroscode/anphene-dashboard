import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string(),
  storefrontSearchPosition: yup.number(),
});

export const valueSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string(),
});
