import * as yup from "yup";

export const schema = yup.object().shape({
  code: yup.string().required(),
  discountValue: yup.number().required(),
  startDate: yup.string().required(),
  endDate: yup.string(),
  startTime: yup.string(),
  endTime: yup.string(),
});
