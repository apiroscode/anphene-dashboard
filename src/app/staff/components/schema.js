import * as yup from "yup";
import { IMAGE_VALIDATION } from "@/config/constants";

export const schema = yup.object().shape({
  email: yup.string().required(),
  name: yup.string().required(),
  note: yup.string(),
  idCard: yup
    .mixed()
    .test("fileSize", "File too large", (value) =>
      value ? value.size < IMAGE_VALIDATION.fileSize : true
    )
    .test("fileFormat", "Unsupported format", (value) =>
      value ? IMAGE_VALIDATION.formats.includes(value.type) : true
    ),
});
