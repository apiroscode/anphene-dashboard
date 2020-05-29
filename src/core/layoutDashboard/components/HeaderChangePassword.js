import React from "react";

import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { useMutation } from "@apollo/react-hooks";
import { Grid } from "@material-ui/core";

import { getErrors, PasswordField, validationResolver } from "@/components/form";
import { Dialog } from "@/components/Dialog";

import { CHANGE_PASSWORD } from "@/graphql/mutations/auth";

const validationSchema = yup.object().shape({
  newPassword: yup.string().required(),
  oldPassword: yup.string().required(),
});

export const HeaderChangePassword = (props) => {
  const { open, onClose } = props;

  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    setError,
    handleSubmit,
    errors,
    reset,
    formState: { dirty, isSubmitting },
  } = useForm({
    defaultValues: { newPassword: "", oldPassword: "" },
    validationResolver,
    validationContext: validationSchema,
  });

  const onSubmit = async (data) => {
    const {
      data: {
        passwordChange: { user, errors },
      },
    } = await changePassword({ variables: data });
    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`${user.email} password has been changed.`, {
        variant: "success",
      });
      reset();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      handleOk={handleSubmit(onSubmit)}
      handleClose={onClose}
      title="Change Password"
      okText="CHANGE PASSWORD"
      okProps={{ loading: isSubmitting, disabled: !dirty }}
    >
      <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
        <Grid item>
          <Controller
            as={PasswordField}
            control={control}
            InputLabelProps={{ variant: "filled" }}
            label="Old Password"
            name="oldPassword"
            autoComplete="off"
            fullWidth
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
          />
        </Grid>
        <Grid item>
          <Controller
            as={PasswordField}
            control={control}
            InputLabelProps={{ variant: "filled" }}
            label="New Password"
            name="newPassword"
            autoComplete="off"
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};
