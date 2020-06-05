import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { GET_ALL_PERMISSIONS } from "@/graphql/queries/groups";
import { CREATE_GROUP } from "@/graphql/mutations/groups";
import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper } from "@/components/Template";

import { FormGeneralInformation, FormPermissions } from "../components";

const schema = yup.object().shape({
  name: yup.string().required(),
});
const defaultValues = { name: "", permissions: [] };

const Base = ({ data }) => {
  const { allPermissions } = data;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CREATE_GROUP);

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
      setValue("permissions", [...permissions, e.target.name]);
    } else {
      const newPermissions = permissions.filter((item) => item !== e.target.name);
      setValue(
        "permissions",
        newPermissions.length > 0 ? newPermissions : defaultValues.permissions
      );
    }
  };

  const onSubmit = async (data) => {
    const result = await create({ variables: data });
    if (result === undefined) return;

    const {
      data: {
        groupCreate: { group, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
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
        <FormGeneralInformation control={control} errors={errors} />
        <FormPermissions
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
  <QueryWrapper query={GET_ALL_PERMISSIONS} fieldName="allPermissions">
    {(data) => <Base data={data} />}
  </QueryWrapper>
);
