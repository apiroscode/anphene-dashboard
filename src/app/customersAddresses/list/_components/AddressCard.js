import React from "react";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";

import { AddressCardAction } from "./AddressCardAction";

const useStyles = makeStyles(
  (theme) => ({
    bottomAction: {
      marginLeft: "auto",
      "&>:not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
  }),
  { name: "AddressCard" }
);

export const AddressCard = (props) => {
  const {
    address,
    defaultShippingAddress,
    handleDefaultShipping,
    handleEdit,
    handleDelete,
  } = props;
  const classes = useStyles();

  return (
    <Card
      title={address.id === defaultShippingAddress?.id ? "Default Shipping Address" : ""}
      action={
        <AddressCardAction
          menuItems={[
            {
              label: "Set as default shipping address",
              onSelect: () => {
                handleDefaultShipping(address.id);
              },
            },
          ]}
        />
      }
      bottomAction={
        <div className={classes.bottomAction}>
          <Button color="primary" onClick={() => handleEdit(address.id)}>
            Edit
          </Button>
          <Button color="primary" onClick={() => handleDelete(address.id)}>
            Delete
          </Button>
        </div>
      }
    >
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
    </Card>
  );
};
