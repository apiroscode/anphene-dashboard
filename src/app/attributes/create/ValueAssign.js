import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { Dialog } from "@/components/Dialog";

import { AttributeValue } from "../components";

export const schema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string(),
});

const ACTION = "assign-value";
export const ValueAssign = (props) => {
  const { setValue, values, params, handleClose } = props;
  const { action } = params;
  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (action !== ACTION) {
      reset();
    }
  }, [reset, action]);

  const onAssign = (data) => {
    const { name } = data;
    if (values.map((item) => item.name).includes(name)) {
      setError("name", null, "Name already existed");
    } else {
      setValue("values", [...values, data]);
      handleClose();
    }
  };

  return (
    <Dialog
      title="Assign Value"
      open={params.action === ACTION}
      handleOk={handleSubmit(onAssign)}
      handleClose={handleClose}
      okText="Assign"
    >
      <AttributeValue control={control} errors={errors} />
    </Dialog>
  );
};
