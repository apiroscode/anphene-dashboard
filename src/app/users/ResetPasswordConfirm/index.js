import React from "react";

import { useSnackbar } from "notistack";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers";
import { Box, Button, Card, CardContent, Link, Typography } from "@material-ui/core";
import { VpnKey } from "@material-ui/icons";

import { useQS } from "@/utils/hooks";
import { getErrors, PasswordField } from "@/components/form";

import { PASSWORD_RESET_CONFIRM } from "@/graphql/mutations/auth";

import { useStyles } from "../styles";

const schema = yup.object().shape({
  password: yup.string().required(),
});

export default () => {
  const [confirmPassword] = useMutation(PASSWORD_RESET_CONFIRM);
  const [params] = useQS(["email", "token"]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const classes = useStyles();

  const {
    control,
    setError,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const {
      data: {
        setPassword: { errors },
      },
    } = await confirmPassword({
      variables: {
        password: data.password,
        email: params.email ? params.email : "",
        token: params.token ? params.token : "",
      },
    });
    if (errors.length > 0) {
      setError(getErrors(errors));
      const errorsField = errors.map((item) => item.field);

      if (errorsField.includes("token") || errorsField.includes("email")) {
        enqueueSnackbar(errors[0].message, {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar(`Your password successfully changed please re-login again.`, {
        variant: "success",
      });
      reset();
      navigate("../login");
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <VpnKey className={classes.iconHeader} />
        <Box display="flex" flexDirection="column">
          <Typography className={classes.marginBottom} variant="caption">
            Hi, {params.email}.
            <br />
            You can set new password or back to login page.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={PasswordField}
              control={control}
              InputLabelProps={{ variant: "filled" }}
              name="password"
              label="New password"
              autoComplete="off"
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
              RESET PASSWORD
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
