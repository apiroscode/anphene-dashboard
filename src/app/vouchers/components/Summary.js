import React from "react";

import dayjs from "dayjs";

import { Divider, Typography } from "@material-ui/core";

import { Card } from "@/components/Template";

export const Summary = (props) => {
  const { watch } = props;
  const code = watch("code");
  const type = watch("type");
  const discountType = watch("discountType");
  const discountValue = watch("discountValue");
  const startDate = watch("startDate");
  const startHour = watch("startHour");
  const endDate = watch("endDate");
  const endHour = watch("endHour");

  const minSpentAmount = watch("minSpentAmount");
  const minCheckoutItemsQuantity = watch("minCheckoutItemsQuantity");
  const usageLimit = watch("usageLimit");

  const startStr = startDate ? `${startDate} ${startHour ? startHour : "00:00"}` : "";
  const endStr = endDate ? `${endDate} ${endHour ? endHour : "00:00"}` : "";

  return (
    <Card title="Summary" useMargin>
      <div>
        <Typography variant="caption">Code</Typography>
        <Typography variant="body1">{code ? code : "-"}</Typography>
      </div>
      <div>
        <Typography variant="caption">Applies to</Typography>
        <Typography variant="body1">
          {type === "SHIPPING"
            ? "Free Shipping"
            : type === "ENTIRE_ORDER"
            ? "Entire order"
            : "Specific Product"}
        </Typography>
      </div>
      <div>
        <Typography variant="caption">Value</Typography>
        <Typography variant="body1">
          {discountValue
            ? discountType === "PERCENTAGE"
              ? `${discountValue} %`
              : `Rp ${discountValue}`
            : "0"}
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
      <Divider />
      {!!minSpentAmount && (
        <div>
          <Typography variant="caption">Min. Order Value</Typography>
          <Typography variant="body1">Rp {minSpentAmount ? minSpentAmount : 0}</Typography>
        </div>
      )}
      {!!minCheckoutItemsQuantity && (
        <div>
          <Typography variant="caption">Min. checkout quantity</Typography>
          <Typography variant="body1">
            {minCheckoutItemsQuantity ? minCheckoutItemsQuantity : 0}
          </Typography>
        </div>
      )}
      <div>
        <Typography variant="caption">Usage limit</Typography>
        <Typography variant="body1">{usageLimit ? usageLimit : "-"}</Typography>
      </div>
    </Card>
  );
};
