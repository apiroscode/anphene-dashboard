import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
  phone: yup.string().required("This field is required"),
  streetAddress: yup.string().required("This field is required"),
  postalCode: yup.string(),
  subDistrict: yup.string().required("This field is required"),
});
