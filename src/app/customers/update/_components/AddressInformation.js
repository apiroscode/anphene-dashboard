import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";

const useStyles = makeStyles(
  (theme) => ({
    titleHeader: {
      fontWeight: 600,
    },
  }),
  { name: "AddressInformation" }
);

export const AddressInformation = ({ address }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Card
      title="Address Information"
      action={
        <Button color="primary" onClick={() => navigate("addresses")}>
          MANAGE
        </Button>
      }
      useMargin
    >
      {address ? (
        <>
          <Typography variant="body1" className={classes.titleHeader}>
            Default Shipping Address
          </Typography>
          <div>
            <Typography variant="body1">{address.name}</Typography>
            <Typography variant="body1">{address.phone}</Typography>
            <Typography variant="body1">{address.streetAddress}</Typography>
            <Typography variant="body1">
              {address.subDistrict.city.province.name}, {address.subDistrict.city.name}
            </Typography>
            <Typography variant="body1">
              {address.subDistrict.name} {address.postalCode}
            </Typography>
          </div>
        </>
      ) : (
        <Typography variant="body1">This customer has no addresses yet</Typography>
      )}
    </Card>
  );
};
