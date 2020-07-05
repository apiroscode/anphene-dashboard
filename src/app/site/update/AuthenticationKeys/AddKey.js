import React from "react";

import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { getErrors, Password } from "@/components/_form";
import { Dialog } from "@/components/Dialog";
import { RowGrid } from "@/components/RowGrid";

import { AddAuthorizationKey } from "../../mutations";

const schema = yup.object().shape({
  input: yup.object().shape({
    key: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  }),
  keyType: yup.string().required("This field is required"),
});

const defaultValues = {
  input: {
    key: "",
    password: "",
  },
  keyType: "FACEBOOK",
};

export const ACTION = "add-key";
export const AddKey = (props) => {
  const [addKey] = useMutation(AddAuthorizationKey);
  const { params, setParams } = props;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    control,
    errors,
    setError,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = methods;

  const handleClose = () => {
    setParams({ action: undefined });
    reset(defaultValues);
  };

  const onSubmit = async (data) => {
    const result = await addKey({ variables: data });
    if (result === undefined) return;

    const {
      data: {
        authorizationKeyAdd: { errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Key for ${data.keyType} successfully added.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  return (
    <Dialog
      title="Add New Authorization Key"
      open={params.action === ACTION}
      handleOk={handleSubmit(onSubmit)}
      handleClose={handleClose}
      okText="ADD AUTHENTICATION"
      okProps={{
        disabled: !isDirty,
        loading: isSubmitting,
      }}
      dialogProps={{
        fullWidth: false,
      }}
    >
      <form>
        <RowGrid>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="input-type">Authentication Type</InputLabel>
            <Controller
              as={Select}
              control={control}
              labelId="input-type"
              name="keyType"
              error={!!errors.keyType}
            >
              <MenuItem value="FACEBOOK">Facebook</MenuItem>
              <MenuItem value="GOOGLE_OAUTH2">Google OAuth2</MenuItem>
            </Controller>
            {!!errors.keyType && (
              <FormHelperText error={!!errors.keyType}>{errors.keyType?.message}</FormHelperText>
            )}
          </FormControl>
          <Controller
            as={TextField}
            control={control}
            name="input.key"
            label="Key"
            fullWidth
            error={!!errors.input?.key}
            helperText={errors.input?.key?.message}
          />
          <Controller
            as={Password}
            control={control}
            InputLabelProps={{ variant: "filled" }}
            label="Password"
            name="input.password"
            autoComplete="off"
            fullWidth
            error={!!errors.input?.password}
            helperText={errors.input?.password?.message}
          />
        </RowGrid>
      </form>
    </Dialog>
  );
};
