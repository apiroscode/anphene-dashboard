import React from "react";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";

import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers";
import { Box, Button, Card, CardContent, Link, TextField, Typography } from "@material-ui/core";
import { Help } from "@material-ui/icons";

import { CONFIRM_PASSWORD_URI } from "@/config/constants";
import { getErrors } from "@/components/form";

import { REQUEST_PASSWORD_RESET } from "@/graphql/mutations/auth";

import { useStyles } from "../styles";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default () => {
  const [resetPassword] = useMutation(REQUEST_PASSWORD_RESET);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const {
    control,
    setError,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const {
      data: {
        requestPasswordReset: { errors },
      },
    } = await resetPassword({
      variables: { email: data.email.trim().toLowerCase(), redirectUrl: CONFIRM_PASSWORD_URI },
    });
    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`A magic link has been sent to ${data.email}.`, {
        variant: "success",
      });
      reset();
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Help className={classes.iconHeader} />
        <Box display="flex" flexDirection="column">
          <Typography className={classes.marginBottom} variant="caption">
            Forgot your password? Don't worry, we'll reset it for you.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={TextField}
              control={control}
              name="email"
              type="email"
              label="Email"
              fullWidth
              className={classes.marginBottom}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              className={classes.marginBottom}
              type="submit"
            >
              SEND INSTRUCTIONS
            </Button>
          </form>
          <Link component={RouterLink} to="../login">
            {"< back to login page"}
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};
