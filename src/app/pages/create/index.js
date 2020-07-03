import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, Publish, SaveButton, Seo } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreatePage } from "../mutations";
import { GeneralInformation, schema, Url } from "../_form";

export default () => {
  const [create] = useMutation(CreatePage);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "{}",
      seo: {
        title: "",
        description: "",
      },
      isPublished: false,
      publicationDate: null,
    },
    resolver: yupResolver(schema),
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
        pageCreate: { page, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Page ${data.title} successfully created.`, {
        variant: "success",
      });
      navigate(`../${page.id}`);
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
          <Url {...methods} />
          <Publish {...methods} />
        </RowGrid>
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
