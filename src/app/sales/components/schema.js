import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  value: yup.number().required(),
  startDate: yup.string().required(),
  endDate: yup.string(),
  startTime: yup.string(),
  endTime: yup.string(),
});
