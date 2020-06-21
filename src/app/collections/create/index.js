import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@/utils/hooks";

import { CREATE_COLLECTION } from "@/graphql/mutations/collections";

import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";
import { ColGrid, Header, RowGrid } from "@/components/Template";

import { FormGeneralInformation } from "../components/FormGeneralInformation";

export default () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CREATE_COLLECTION);
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
      setError(getErrors(errors));
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
          <FormGeneralInformation {...methods} />
          <SeoForm {...methods} />
        </RowGrid>
        <RowGrid>
          <PublishForm {...methods} />
        </RowGrid>
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
