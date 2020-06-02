import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers";

import { GET_STAFF } from "@/graphql/queries/staff";
import { DELETE_STAFF, UPDATE_STAFF } from "@/graphql/mutations/staff";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormGroups, FormIdCard, FormUserInformation, schema } from "../components";

const Base = (props) => {
  const { user, groups: groupsData } = props;
  const [update] = useMutation(UPDATE_STAFF);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_STAFF,
    id: user.id,
    name: user.name,
    field: "staffDelete",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user.email,
      name: user.name,
      note: user.note,
      idCard: "",
      groups: user.permissionGroups.map((item) => item.id),
    },
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

  const groups = watch("groups");
  const idCard = watch("idCard");

  useEffect(() => {
    register("groups");
    register("idCard");
    return () => {
      unregister("groups");
      unregister("idCard");
    };
  }, [register, unregister]);

  const onSubmit = async (data) => {
    const {
      data: {
        staffUpdate: { user: updatedUser, errors },
      },
    } = await update({ variables: { id: user.id, ...data } });

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Staff ${updatedUser.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        email: updatedUser.email,
        name: updatedUser.name,
        note: updatedUser.note,
        idCard: "",
        groups: updatedUser.permissionGroups.map((item) => item.id),
      });
    }
  };
  return (
    <>
      <Header title="Invite Staff" />
      <ColGrid>
        <RowGrid>
          <FormUserInformation control={control} errors={errors} />
          <FormIdCard
            idCard={idCard}
            setValue={setValue}
            errors={errors}
            idCardUrl={user.idCard}
          />
        </RowGrid>
        <FormGroups groupsData={groupsData} setValue={setValue} groups={groups} />
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
    <QueryWrapper query={GET_STAFF} id={id} fieldName="user">
      {(data) => {
        const groups = data.permissionGroups.edges.map((item) => item.node);
        return <Base user={data.user} groups={groups} />;
      }}
    </QueryWrapper>
  );
};