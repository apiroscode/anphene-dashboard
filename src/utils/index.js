import dayjs from "dayjs";

export const maybe = (exp, d) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const getOptimizeDate = (data) => {
  const startDateStr = `${data.startDate} ${data.startHour ? data.startHour : "00:00"}`;
  const startDate = dayjs(startDateStr).format();
  const endDateStr = data?.endDate
    ? `${data.endDate} ${data.endHour ? data.endHour : "00:00"}`
    : "";
  const endDate = endDateStr ? dayjs(endDateStr).format() : null;

  const newData = { ...data, startDate, endDate };
  delete newData["startHour"];
  delete newData["endHour"];
  return newData;
};
