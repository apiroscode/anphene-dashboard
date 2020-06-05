import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { Dialog } from "@/components/Dialog";

import { AttributeValue } from "../components";

import { schema } from "./ValueAssign";

export const ValueUpdate = (props) => {
  const { edit, setEdit, values, setValue } = props;
  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(edit.data);
  }, [reset, edit.data]);

  const onUpdate = (data) => {
    const { index } = edit;
    const { name } = data;
    if (
      values
        .map((item) => item.name)
        .filter((item) => item !== edit.data.name)
        .includes(name)
    ) {
      setError("name", null, "Name already existed");
    } else {
      const newValues = [...values];
      newValues[index] = data;
      setValue("values", newValues);

      handleClose();
    }
  };

  const handleClose = () => {
    setEdit({
      open: false,
      index: null,
      data: {},
    });
    reset({ name: "", value: "" });
  };

  return (
    <Dialog
      title="Update Value"
      open={edit.open}
      handleOk={handleSubmit(onUpdate)}
      handleClose={handleClose}
      okText="Update"
    >
      <AttributeValue control={control} errors={errors} />
    </Dialog>
  );
};
