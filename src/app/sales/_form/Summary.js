import React from "react";

import dayjs from "dayjs";
import { useWatch } from "react-hook-form";

import { Divider, Typography } from "@material-ui/core";

import { Card } from "@/components/Card";

export const Summary = (props) => {
  const { control } = props;
  const name = useWatch({ control, name: "name", defaultValue: "" });
  const type = useWatch({ control, name: "type", defaultValue: "PERCENTAGE" });
  const value = useWatch({ control, name: "value", defaultValue: "" });
  const startDate = useWatch({ control, name: "startDate", defaultValue: "" });
  const startHour = useWatch({ control, name: "startHour", defaultValue: "" });
  const endDate = useWatch({ control, name: "endDate", defaultValue: "" });
  const endHour = useWatch({ control, name: "endHour", defaultValue: "" });

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
          {value ? (type === "PERCENTAGE" ? `${value} %` : `Rp ${value}`) : "0"}
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
