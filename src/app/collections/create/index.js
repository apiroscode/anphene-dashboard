import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@/utils/hooks";

import { getErrors, Publish, SaveButton, Seo } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateCollection } from "../mutations";

import { GeneralInformation } from "../_form/GeneralInformation";

export default () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CreateCollection);
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "{}",
      seo: {
        title: "",
        description: "",
      },
      isPublished: false,
      publicationDate: null,
    },
  });

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        collectionCreate: { collection, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Collection ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`/collections/${collection.id}`);
    }
  };

  return (
    <>
      <Header title="Create Collection" />
      <ColGrid>
        <RowGrid>
          <GeneralInformation {...methods} />
          <Seo {...methods} />
        </RowGrid>
        <RowGrid>
          <Publish {...methods} />
        </RowGrid>
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
