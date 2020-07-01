import React from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { GET_PAGE } from "@/graphql/queries/pages";
import { UPDATE_PAGE, DELETE_PAGE } from "@/graphql/mutations/mutations";

import { FormGeneralInformation, FormUrl, schema } from "../components";

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
  const [update] = useMutation(UPDATE_PAGE);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_PAGE,
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
          <FormGeneralInformation {...methods} page={page} />
          <SeoForm {...methods} />
        </RowGrid>
        <RowGrid>
          <FormUrl {...methods} />
          <PublishForm {...methods} />
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
    <QueryWrapper query={GET_PAGE} id={id} fieldName="page">
      {(data) => <Base page={data.page} />}
    </QueryWrapper>
  );
};
