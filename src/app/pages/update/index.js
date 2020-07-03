import React from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, Publish, SaveButton, Seo } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";
import { QueryWrapper } from "@/components/QueryWrapper";

import { GetPage } from "../queries";
import { DeletePage, UpdatePage } from "../mutations";

import { GeneralInformation, schema, Url } from "../_form";

const getDefaultValues = (page) => ({
  title: page.title,
  slug: page.slug,
  content: page.content,
  seo: {
    title: page.seoTitle,
    description: page.seoDescription,
  },
  isPublished: page.isPublished,
  publicationDate: page.publicationDate,
});

const Base = ({ page }) => {
  const [update] = useMutation(UpdatePage);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeletePage,
    id: page.id,
    name: page.title,
    field: "pageDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(page),
    resolver: yupResolver(schema),
  });

  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: page.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        pageUpdate: { page: updatedPage, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Page ${data.title} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedPage));
    }
  };

  return (
    <>
      <Header title={`Update ${page.title}`} />
      <ColGrid>
        <RowGrid>
          <GeneralInformation {...methods} page={page} />
          <Seo {...methods} title={page.seoTitle} description={page.seoDescription} />
        </RowGrid>
        <RowGrid>
          <Url {...methods} />
          <Publish {...methods} publish={page.isPublished} date={page.publicationDate} />
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
    <QueryWrapper query={GetPage} id={id} fieldName="page">
      {(data) => <Base page={data.page} />}
    </QueryWrapper>
  );
};
