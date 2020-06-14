import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { UPDATE_ATTRIBUTE_VALUE } from "@/graphql/mutations/attributes";

import { getErrors } from "@/components/form";
import { Dialog } from "@/components/Dialog";

import { AttributeValue } from "../components";
import { valueSchema } from "./valueSchema";

export const ValueUpdate = (props) => {
  const {
    updateValue: { open, value },
    setUpdateValue,
  } = props;

  const [update, { loading }] = useMutation(UPDATE_ATTRIBUTE_VALUE);
  const { enqueueSnackbar } = useSnackbar();

  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(valueSchema),
  });

  useEffect(() => {
    reset({
      name: value.name,
      value: value.value,
    });
  }, [reset, value]);

  const onUpdate = async (data) => {
    const result = await update({ variables: { id: value.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        attributeValueUpdate: { attributeValue, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Value ${attributeValue.name} successfully updated.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setUpdateValue({
      open: false,
      value: {},
    });
    reset({ name: "", value: "" });
  };

  return (
    <Dialog
      title={`Update Value ${value.name}`}
      open={open}
      handleOk={handleSubmit(onUpdate)}
      handleClose={handleClose}
      okText="Update"
      okProps={{ loading }}
      cancelProps={{ loading }}
    >
      <AttributeValue control={control} errors={errors} />
    </Dialog>
  );
};
