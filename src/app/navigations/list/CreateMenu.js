import React from "react";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { Dialog } from "@/components/Dialog";
import { getErrors } from "@/components/form";

import { CREATE_MENU } from "@/graphql/mutations/navigations";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const ACTION = "create-menu";
export const CreateMenu = (props) => {
  const { params, setParams } = props;
  const [create] = useMutation(CREATE_MENU);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    control,
    setError,
    errors,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onClose = () => {
    setParams({ action: undefined });
    reset({ name: "" });
  };

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        menuCreate: { menu, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Menu ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`${menu.id}`);
    }
  };

  return (
    <Dialog
      title="Create Menu"
      open={params.action === ACTION}
      handleOk={handleSubmit(onSubmit)}
      handleClose={onClose}
      okText="Create"
      okProps={{
        disabled: !isDirty,
        loading: isSubmitting,
      }}
    >
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Menu Title"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Dialog>
  );
};
