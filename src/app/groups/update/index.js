import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import * as yup from "yup";

import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers";

import { GET_GROUP } from "@/graphql/queries/groups";
import { DELETE_GROUP, UPDATE_GROUP } from "@/graphql/mutations/groups";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper } from "@/components/Template";

import { FormGeneralInformation, FormPermissions } from "../components";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const Base = ({ data }) => {
  const { allPermissions, permissionGroup } = data;
  const [update] = useMutation(UPDATE_GROUP);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_GROUP,
    id: permissionGroup.id,
    name: permissionGroup.name,
    field: "groupDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: permissionGroup.name,
      permissions: permissionGroup.permissions.map((item) => item.code),
    },
    resolver: yupResolver(schema),
  });
  const {
    watch,
    register,
    unregister,
    control,
    errors,
    setError,
    setValue,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;
  const permissions = watch("permissions");

  useEffect(() => {
    register("permissions");
    return () => unregister("permissions");
  }, [register, unregister]);

  const handlePermission = (e) => {
    if (e.target.checked) {
      setValue("permissions", [...permissions, e.target.name]);
    } else {
      const newPermissions = permissions.filter((item) => item !== e.target.name);
      setValue("permissions", newPermissions);
    }
  };

  const onSubmit = async (data) => {
    const {
      data: {
        groupUpdate: { group, errors },
      },
    } = await update({ variables: { id: permissionGroup.id, ...data } });
    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Group ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: group.name,
        permissions: group.permissions.map((item) => item.code),
      });
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
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
      />
    </>
  );
};

export default () => {
  const { id } = useParams();
  return (
    <QueryWrapper query={GET_GROUP} id={id} fieldName={"permissionGroup"}>
      {(data) => <Base data={data} />}
    </QueryWrapper>
  );
};
