import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useParams } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation, useQS } from "@/utils/hooks";

import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";

import { GetCustomerAddresses } from "../queries";
import { SetDefaultAddress } from "../mutations";

import {
  ADD_ACTION,
  AddAddress,
  AddressCard,
  DELETE_ACTION,
  DeleteAddress,
  EDIT_ACTION,
  EditAddress,
} from "./_components";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    alignItems: "start",
    gridRowGap: theme.spacing(2),
    gridColumnGap: theme.spacing(2),
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  noAddressWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  noAddressRoot: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 600,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "& > :nth-child(1)": {
      marginBottom: theme.spacing(1),
    },
    "& > :nth-child(2)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Base = ({ customer }) => {
  const { addresses, defaultShippingAddress } = customer;
  const { enqueueSnackbar } = useSnackbar();
  const [setDefault] = useMutation(SetDefaultAddress);
  const classes = useStyles();
  const [params, setParams] = useQS({
    action: undefined,
    id: undefined,
  });
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);

  useEffect(() => {
    setHeaderBackLabel({
      label: customer.email,
      link: `/customers/${customer.id}`,
    });

    return () => setHeaderBackLabel(undefined);
  }, [customer, setHeaderBackLabel]);

  const action = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        setParams({
          action: ADD_ACTION,
          id: undefined,
        });
      }}
    >
      Add Address
    </Button>
  );

  const noAddress = (
    <div className={classes.noAddressWrapper}>
      <div className={classes.noAddressRoot}>
        <Typography variant="h5">There is no address to show for this customer</Typography>
        <Typography variant="body1">
          This customer doesnt have any addresses added to his address book. You can add address
          using the button below.
        </Typography>
        {action}
      </div>
    </div>
  );

  const handleClose = () => {
    setParams({
      action: undefined,
      id: undefined,
    });
  };

  const handleDefaultShipping = async (id) => {
    const result = await setDefault({
      variables: {
        userId: customer.id,
        addressId: id,
      },
    });
    if (result === undefined) return;
    const address = addresses.find((address) => address.id === id);
    const {
      data: {
        addressSetDefault: { errors },
      },
    } = result;
    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Address ${address.name} set as default.`, {
        variant: "success",
      });
    }
  };

  const handleEdit = (id) => {
    setParams({
      action: EDIT_ACTION,
      id,
    });
  };

  const handleDelete = (id) => {
    setParams({
      action: DELETE_ACTION,
      id,
    });
  };

  return (
    <>
      {addresses.length > 0 ? (
        <>
          <Header title="Address Book" actions={action} />
          <div className={classes.root}>
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                defaultShippingAddress={defaultShippingAddress}
                handleDefaultShipping={handleDefaultShipping}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        noAddress
      )}
      <AddAddress customerId={customer.id} handleClose={handleClose} params={params} />
      <EditAddress handleClose={handleClose} params={params} addresses={addresses} />
      <DeleteAddress handleClose={handleClose} params={params} addresses={addresses} />
    </>
  );
};
export default () => {
  const { id } = useParams();
  return (
    <QueryWrapper query={GetCustomerAddresses} id={id} fieldName="user">
      {(data) => <Base customer={data.user} />}
    </QueryWrapper>
  );
};
