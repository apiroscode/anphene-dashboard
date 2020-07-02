import React, { useState } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useMutation, useQS } from "@/utils/hooks";

import { getErrors, Publish, SaveButton, Seo } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { AssignProducts } from "@/app/_components/AssignProducts";
import { ProductSimpleList } from "@/app/_components/ProductSimpleList";

import { GetCollection } from "../queries";
import { DeleteCollection, UpdateCollection } from "../mutations";

import { GeneralInformation } from "../_form";
import { BackgroundImage } from "./BackgroundImage";
import { useAssignProductsProps, useProductSimpleListProps } from "./utils";

export const getDefaultValues = (collection) => ({
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
  const [update] = useMutation(UpdateCollection);

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
    mutation: DeleteCollection,
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
      getErrors(errors, setError);
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
          <GeneralInformation {...methods} collection={collection} />
          <BackgroundImage
            {...methods}
            id={collection.id}
            image={collection.backgroundImage}
            update={update}
            enqueueSnackbar={enqueueSnackbar}
          />
          <ProductSimpleList {...productSimpleListProps} />
          <Seo {...methods} />
        </RowGrid>
        <RowGrid>
          <Publish {...methods} publicationDateData={collection.publicationDate} />
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
    <QueryWrapper query={GetCollection} id={id} fieldName="collection">
      {(data) => <Base collection={data.collection} />}
    </QueryWrapper>
  );
};
