import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { PermissionEnum } from "@/config/enum";
import { useMutation, usePermissions } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";
import { QueryWrapper } from "@/components/QueryWrapper";

import { GetGroup } from "../queries";
import { DeleteGroup, UpdateGroup } from "../mutations";

import { GeneralInformation, Permissions } from "../_form";
import { Staff } from "./_components";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const getDefaultValues = (group) => ({
  name: group.name,
  permissions: group.permissions.map((item) => item.code),
});
const Base = ({ data }) => {
  const [gotPermission] = usePermissions(PermissionEnum.MANAGE_STAFF);
  const { allPermissions, group } = data;
  const [update] = useMutation(UpdateGroup);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteGroup,
    id: group.id,
    name: group.name,
    field: "groupDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(group),
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
      setValue("permissions", [...permissions, e.target.name], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      const newPermissions = permissions.filter((item) => item !== e.target.name);
      setValue("permissions", newPermissions, { shouldValidate: true, shouldDirty: true });
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
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Group ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedGroup));
    }
  };

  return (
    <>
      <Header title={`Update ${group.name}`} />
      <ColGrid>
        <RowGrid>
          <GeneralInformation control={control} errors={errors} />
          {gotPermission && <Staff group={group} />}
        </RowGrid>
        <Permissions
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
    <QueryWrapper query={GetGroup} id={id} fieldName="group">
      {(data) => <Base data={data} />}
    </QueryWrapper>
  );
};
