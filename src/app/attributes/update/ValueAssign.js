import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CREATE_ATTRIBUTE_VALUE } from "@/graphql/mutations/attributes";

import { getErrors } from "@/components/form";
import { Dialog } from "@/components/Dialog";

import { AttributeValue } from "../components";
import { valueSchema } from "./valueSchema";

const ACTION = "assign-value";
export const ValueAssign = (props) => {
  const { attributeId, handleClose, params } = props;
  const [create, { loading }] = useMutation(CREATE_ATTRIBUTE_VALUE);
  const { enqueueSnackbar } = useSnackbar();
  const { action } = params;

  const { control, reset, handleSubmit, errors, setError } = useForm({
    defaultValues: { name: "", value: "" },
    resolver: yupResolver(valueSchema),
  });

  useEffect(() => {
    if (action !== ACTION) {
      reset();
    }
  }, [reset, action]);

  const onAssign = async (data) => {
    const result = await create({ variables: { attributeId, input: data } });
    if (result === undefined) return;

    const {
      data: {
        attributeValueCreate: { errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Value ${data.name} successfully assign.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  return (
    <Dialog
      title="Assign Value"
      open={action === ACTION}
      handleOk={handleSubmit(onAssign)}
      handleClose={handleClose}
      okText="Assign"
      okProps={{ loading }}
      cancelProps={{ loading }}
    >
      <AttributeValue control={control} errors={errors} />
    </Dialog>
  );
};
