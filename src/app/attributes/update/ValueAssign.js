import React, { useState } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";
import { Button } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { CREATE_ATTRIBUTE_VALUE } from "@/graphql/mutations/attributes";

import { getErrors } from "@/components/form";
import { Dialog } from "@/components/Dialog";

import { AttributeValue } from "../components";
import { valueSchema } from "./valueSchema";

export const ValueAssign = (props) => {
  const { attributeId } = props;
  const [create, { loading }] = useMutation(CREATE_ATTRIBUTE_VALUE);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(valueSchema),
  });

  const onAssign = async (data) => {
    const result = await create({ variables: { attributeId, ...data } });
    if (result === undefined) return;

    const {
      data: {
        attributeValueCreate: { errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Value ${data.name} successfully assign.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        Assign Value
      </Button>
      <Dialog
        title="Assign Value"
        open={open}
        handleOk={handleSubmit(onAssign)}
        handleClose={handleClose}
        okText="Assign"
        okProps={{ loading }}
        cancelProps={{ loading }}
      >
        <AttributeValue control={control} errors={errors} />
      </Dialog>
    </>
  );
};
