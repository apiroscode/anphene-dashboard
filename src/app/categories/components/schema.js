import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  seoTitle: yup.string(),
  seoDescription: yup.string(),
});
