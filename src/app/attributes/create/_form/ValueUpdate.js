import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { Dialog } from "@/components/Dialog";

import { AttributeValue, valueSchema } from "../../_form";

const ACTION = "update-value";
export const ValueUpdate = (props) => {
  const { values, setValue, params, handleClose } = props;
  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(valueSchema),
  });

  const { id, action } = params;

  useEffect(() => {
    const value = values[id];
    if (value) {
      reset(value);
    } else {
      reset({ name: "", value: "" });
    }
  }, [values, id, reset]);

  const onUpdate = (data) => {
    const value = values[id];
    const { name } = data;
    if (
      values
        .map((item) => item.name)
        .filter((item) => item !== value.name)
        .includes(name)
    ) {
      setError("name", {
        type: null,
        message: "Name already existed",
      });
    } else {
      const newValues = [...values];
      newValues[id] = data;
      setValue("values", newValues, { shouldValidate: true, shouldDirty: true });
      handleClose();
    }
  };

  return (
    <Dialog
      title="Update Value"
      open={action === ACTION}
      handleOk={handleSubmit(onUpdate)}
      handleClose={handleClose}
      okText="Update"
    >
      <AttributeValue control={control} errors={errors} />
    </Dialog>
  );
};
