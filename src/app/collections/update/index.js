import React, { useState } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useMutation, useQS } from "@/utils/hooks";

import { GET_COLLECTION } from "@/graphql/queries/collections";
import { DELETE_COLLECTION, UPDATE_COLLECTION } from "@/graphql/mutations/collections";

import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { AssignProducts } from "@/app/components/AssignProducts";
import { ProductSimpleList } from "@/app/components/ProductSimpleList";

import { FormGeneralInformation } from "../components";
import { BackgroundImage } from "./BackgroundImage";
import { useAssignProductsProps, useProductSimpleListProps } from "./utils";

const getDefaultValues = (collection) => ({
  name: collection.name,
  description: collection.description,
  seo: {
    title: collection.seoTitle,
    description: collection.seoDescription,
  },
  isPublished: collection.isPublished,
  publicationDate: collection.publicationDate,
  backgroundImageAlt: collection?.backgroundImage?.alt || "",
});

const Base = ({ collection }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [update] = useMutation(UPDATE_COLLECTION);

  // products
  const [params, setParams] = useQS({ action: undefined });
  const [listProps, setListProps] = useState();
  const assignProductsProps = useAssignProductsProps({ collection, listProps, params, setParams });
  const productSimpleListProps = useProductSimpleListProps({
    collection,
    setListProps,
    setParams,
  });

  const deleteProps = {
    mutation: DELETE_COLLECTION,
    id: collection.id,
    name: collection.name,
    field: "collectionDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(collection),
  });

  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: collection.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        collectionUpdate: { collection: updatedCollection, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Collection ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedCollection));
    }
  };

  return (
    <>
      <Header title={collection.name} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} collection={collection} />
          <BackgroundImage
            {...methods}
            id={collection.id}
            image={collection.backgroundImage}
            update={update}
            enqueueSnackbar={enqueueSnackbar}
          />
          <ProductSimpleList {...productSimpleListProps} />
          <SeoForm {...methods} />
        </RowGrid>
        <RowGrid>
          <PublishForm {...methods} publicationDateData={collection.publicationDate} />
        </RowGrid>
      </ColGrid>
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
      />
      <AssignProducts {...assignProductsProps} />
    </>
  );
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper query={GET_COLLECTION} id={id} fieldName="collection">
      {(data) => <Base collection={data.collection} />}
    </QueryWrapper>
  );
};
