import * as yup from "yup";

export const valueSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string(),
});
