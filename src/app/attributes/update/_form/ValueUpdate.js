import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors } from "@/components/_form";
import { Dialog } from "@/components/Dialog";

import { UpdateAttributeValue } from "../../mutations";

import { AttributeValue, valueSchema } from "../../_form";

const ACTION = "update-value";
export const ValueUpdate = (props) => {
  const { attributeValues, params, handleClose } = props;
  const [update, { loading }] = useMutation(UpdateAttributeValue);
  const { enqueueSnackbar } = useSnackbar();

  const { action, id } = params;
  const value = attributeValues.find((x) => x.id === id);

  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(valueSchema),
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value.name,
        value: value.value,
      });
    } else {
      reset({
        name: "",
        value: "",
      });
    }
  }, [reset, value]);

  const onUpdate = async (data) => {
    const result = await update({ variables: { id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        attributeValueUpdate: { attributeValue, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Value ${attributeValue.name} successfully updated.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  return (
    <Dialog
      title={`Update Value ${value?.name}`}
      open={action === ACTION}
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
