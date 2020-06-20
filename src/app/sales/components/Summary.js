import React from "react";

import dayjs from "dayjs";

import { Typography, Divider } from "@material-ui/core";

import { Card } from "@/components/Template";

export const Summary = (props) => {
  const { watch } = props;
  const name = watch("name");
  const type = watch("type");
  const value = watch("value");
  const startDate = watch("startDate");
  const startHour = watch("startHour");
  const endDate = watch("endDate");
  const endHour = watch("endHour");

  const startStr = startDate ? `${startDate} ${startHour ? startHour : "00:00"}` : "";
  const endStr = endDate ? `${endDate} ${endHour ? endHour : "00:00"}` : "";

  return (
    <Card title="Summary" useMargin>
      <div>
        <Typography variant="caption">Name</Typography>
        <Typography variant="body1">{name ? name : "-"}</Typography>
      </div>
      <div>
        <Typography variant="caption">Value</Typography>
        <Typography variant="body1">
          {value ? (type === "PERCENTAGE" ? `${value} %` : `Rp ${value}`) : "-"}
        </Typography>
      </div>
      <Divider />
      <div>
        <Typography variant="caption">Start Date</Typography>
        <Typography variant="body1">{startStr ? dayjs(startStr).format("lll") : "-"}</Typography>
      </div>
      <div>
        <Typography variant="caption">End Date</Typography>
        <Typography variant="body1">{endStr ? dayjs(endStr).format("lll") : "-"}</Typography>
      </div>
    </Card>
  );
};
