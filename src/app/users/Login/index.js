import React from "react";

import { useStoreActions } from "easy-peasy";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";

import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers";
import { Box, Button, Card, CardContent, Link, TextField } from "@material-ui/core";
import { Lock } from "@material-ui/icons";

import { Password } from "@/components/_form";

import { Login, Logout } from "../mutations";

import { useStyles } from "../styles";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default () => {
  const [login] = useMutation(Login);
  const [logout] = useMutation(Logout);
  const { enqueueSnackbar } = useSnackbar();
  const authUpdate = useStoreActions((actions) => actions.auth.update);
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const {
      data: {
        login: { user, errors },
      },
    } = await login({
      variables: { email: data.email.trim().toLowerCase(), password: data.password },
    });
    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      if (!user.isStaff) {
        enqueueSnackbar("You are not staff !", {
          variant: "error",
        });
        await logout();
      } else {
        authUpdate(user);
      }
    }
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Lock className={classes.iconHeader} />
        <Box display="flex" flexDirection="column">
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
            <Controller
              as={Password}
              control={control}
              InputLabelProps={{ variant: "filled" }}
              label="Password"
              name="password"
              autoComplete="on"
              fullWidth
              className={classes.marginBottom}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              className={classes.marginBottom}
              type="submit"
            >
              LOGIN
            </Button>
          </form>
          <Link component={RouterLink} to="../reset-password" className={classes.forgotGrid}>
            Forgot password ?
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};
