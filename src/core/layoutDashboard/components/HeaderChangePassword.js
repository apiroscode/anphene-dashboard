import React, { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";
import { Grid } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { getErrors, Password } from "@/components/_form";
import { Dialog } from "@/components/Dialog";

import { ChangePassword } from "../../../app/users/mutations";

const schema = yup.object().shape({
  newPassword: yup.string().required(),
  oldPassword: yup.string().required(),
});

const ACTION = "change-password";
export const HeaderChangePassword = (props) => {
  const {
    params: { action },
    handleClose,
  } = props;

  const [changePassword] = useMutation(ChangePassword);
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    setError,
    handleSubmit,
    errors,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: { newPassword: "", oldPassword: "" },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [action, reset]);

  const onSubmit = async (data) => {
    const result = await changePassword({ variables: data });
    if (result === undefined) return;

    const {
      data: {
        passwordChange: { user, errors },
      },
    } = result;
    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`${user.email} password has been changed.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  return (
    <Dialog
      open={action === ACTION}
      handleOk={handleSubmit(onSubmit)}
      handleClose={handleClose}
      title="Change Password"
      okText="CHANGE PASSWORD"
      okProps={{ loading: isSubmitting, disabled: !isDirty }}
    >
      <form>
        <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
          <Grid item>
            <Controller
              as={Password}
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
              as={Password}
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
      </form>
    </Dialog>
  );
};
