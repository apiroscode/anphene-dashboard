import { getOptimizeDate } from "@/app/utils";

export const getOptimizeData = (oldData) => {
  const data = getOptimizeDate(oldData);
  const { type } = data;

  if (type === "SHIPPING") {
    data["discountType"] = "FIXED";
    data["applyOncePerOrder"] = true;
  }

  return data;
};
