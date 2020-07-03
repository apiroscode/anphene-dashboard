import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string(),
  address: yup.string(),
});
