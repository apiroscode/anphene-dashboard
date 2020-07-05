import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetStaff } from "../queries";
import { DeleteStaff, UpdateStaff } from "../mutations";
import { Detail, FormIdCard, Groups, schema, UserInformation } from "../_form";

const getDefaultValues = (user) => ({
  email: user.email,
  name: user.name,
  note: user.note,
  idCard: "",
  isActive: user.isActive,
  groups: user.groups.map((item) => item.id),
});

const Base = (props) => {
  const { user, groups: groupsData } = props;
  const [update] = useMutation(UpdateStaff);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteStaff,
    id: user.id,
    name: user.name,
    field: "staffDelete",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(user),
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
    const result = await update({
      variables: {
        id: user.id,
        input: { ...data, idCard: data.idCard ? data.idCard : undefined },
      },
    });
    if (result === undefined) return;

    const {
      data: {
        staffUpdate: { user: updatedUser, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Staff ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedUser));
    }
  };
  return (
    <>
      <Header title={`Update ${user.name}`} />
      <ColGrid>
        <RowGrid>
          <UserInformation control={control} errors={errors} />
          <FormIdCard
            idCard={idCard}
            setValue={setValue}
            errors={errors}
            idCardUrl={user.idCard}
          />
        </RowGrid>
        <RowGrid>
          <Groups groupsData={groupsData} setValue={setValue} groups={groups} />
          <Detail control={control} errors={errors} />
        </RowGrid>
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
    <QueryWrapper query={GetStaff} id={id} fieldName="user">
      {(data) => {
        const groups = data.groups.edges.map((item) => item.node);
        return <Base user={data.user} groups={groups} />;
      }}
    </QueryWrapper>
  );
};
