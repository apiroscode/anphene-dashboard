import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers";

import { GET_GROUPS_FOR_STAFF } from "@/graphql/queries/staff";
import { CREATE_STAFF } from "@/graphql/mutations/staff";

import { CONFIRM_PASSWORD_URI } from "@/config/constants";
import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormGroups, FormIdCard, FormUserInformation, schema } from "../components";

const Base = ({ groups: groupsData }) => {
  const [create] = useMutation(CREATE_STAFF);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      note: "",
      idCard: "",
      groups: [],
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
        staffCreate: { user, errors },
      },
    } = await create({ variables: { ...data, redirectUrl: CONFIRM_PASSWORD_URI } });

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Staff ${user.name} successfully invited.`, {
        variant: "success",
      });
      navigate(`../${user.id}`);
    }
  };

  return (
    <>
      <Header title="Invite Staff" />
      <ColGrid>
        <RowGrid>
          <FormUserInformation control={control} errors={errors} />
          <FormIdCard idCard={idCard} setValue={setValue} errors={errors} />
        </RowGrid>
        <FormGroups groupsData={groupsData} setValue={setValue} groups={groups} />
      </ColGrid>
      <SaveButton
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
        saveText="Invite Staff"
      />
    </>
  );
};

export default () => {
  return (
    <QueryWrapper query={GET_GROUPS_FOR_STAFF} fieldName="permissionGroups">
      {(data) => {
        const groups = data.permissionGroups.edges.map((item) => item.node);
        return <Base groups={groups} />;
      }}
    </QueryWrapper>
  );
};
