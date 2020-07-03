import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CONFIRM_PASSWORD_URI } from "@/config/constants";
import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { CreateStaff } from "../mutations";
import { GetSimpleGroups } from "../../groups/queries";

import { FormIdCard, Groups, schema, UserInformation } from "../_form";

const Base = ({ groups: groupsData }) => {
  const [create] = useMutation(CreateStaff);
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
    const result = await create({
      variables: {
        input: {
          ...data,
          redirectUrl: CONFIRM_PASSWORD_URI,
          idCard: data.idCard ? data.idCard : undefined,
        },
      },
    });
    if (result === undefined) return;

    const {
      data: {
        staffCreate: { user, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
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
          <UserInformation control={control} errors={errors} />
          <FormIdCard idCard={idCard} setValue={setValue} errors={errors} />
        </RowGrid>
        <Groups groupsData={groupsData} setValue={setValue} groups={groups} />
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
    <QueryWrapper query={GetSimpleGroups} fieldName="groups">
      {(data) => {
        const groups = data.groups.edges.map((item) => item.node);
        return <Base groups={groups} />;
      }}
    </QueryWrapper>
  );
};
