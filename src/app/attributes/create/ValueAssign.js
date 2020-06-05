import React, { useState } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";
import { Button } from "@material-ui/core";

import { Dialog } from "@/components/Dialog";

import { AttributeValue } from "../components";

export const schema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string(),
});

export const ValueAssign = (props) => {
  const { setValue, values } = props;
  const [open, setOpen] = useState(false);
  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(schema),
  });

  const onAssign = (data) => {
    const { name } = data;
    if (values.map((item) => item.name).includes(name)) {
      setError("name", null, "Name already existed");
    } else {
      setValue("values", [...values, data]);
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
      >
        <AttributeValue control={control} errors={errors} />
      </Dialog>
    </>
  );
};
