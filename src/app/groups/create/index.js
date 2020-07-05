import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";

import { GetAllPermissions } from "../queries";
import { CreateGroup } from "../mutations";

import { GeneralInformation, Permissions } from "../_form";

const schema = yup.object().shape({
  name: yup.string().required(),
});
const defaultValues = { name: "", permissions: [] };

const Base = ({ data }) => {
  const { allPermissions } = data;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CreateGroup);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    control,
    errors,
    setError,
    watch,
    setValue,
    register,
    unregister,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;
  const permissions = watch("permissions");

  useEffect(() => {
    register("permissions");

    return () => {
      unregister("permissions");
    };
  }, [register, unregister]);

  const handlePermission = (e) => {
    if (e.target.checked) {
      setValue("permissions", [...permissions, e.target.name], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      const newPermissions = permissions.filter((item) => item !== e.target.name);
      setValue(
        "permissions",
        newPermissions.length > 0 ? newPermissions : defaultValues.permissions,
        { shouldValidate: true, shouldDirty: true }
      );
    }
  };

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        groupCreate: { group, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Group ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${group.id}`);
    }
  };

  return (
    <>
      <Header title="Create Group" />
      <ColGrid>
        <GeneralInformation control={control} errors={errors} />
        <Permissions
          allPermissions={allPermissions}
          permissions={permissions}
          handlePermission={handlePermission}
        />
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};

export default () => (
  <QueryWrapper query={GetAllPermissions} fieldName="allPermissions">
    {(data) => <Base data={data} />}
  </QueryWrapper>
);
