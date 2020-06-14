import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { PermissionEnum } from "@/config/enum";
import { useMutation, usePermissions } from "@/utils/hooks";

import { GET_GROUP } from "@/graphql/queries/groups";
import { DELETE_GROUP, UPDATE_GROUP } from "@/graphql/mutations/groups";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormGeneralInformation, FormPermissions } from "../components";
import { Staff } from "./Staff";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const Base = ({ data }) => {
  const [gotPermission] = usePermissions(PermissionEnum.MANAGE_STAFF);
  const { allPermissions, group } = data;
  const [update] = useMutation(UPDATE_GROUP);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_GROUP,
    id: group.id,
    name: group.name,
    field: "groupDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: group.name,
      permissions: group.permissions.map((item) => item.code),
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
    const result = await update({ variables: { id: group.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        groupUpdate: { group: updatedGroup, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Group ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: updatedGroup.name,
        permissions: updatedGroup.permissions.map((item) => item.code),
      });
    }
  };

  return (
    <>
      <Header title={`Update ${group.name}`} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation control={control} errors={errors} />
          {gotPermission && <Staff group={group} />}
        </RowGrid>
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
    <QueryWrapper query={GET_GROUP} id={id} fieldName="group">
      {(data) => <Base data={data} />}
    </QueryWrapper>
  );
};
