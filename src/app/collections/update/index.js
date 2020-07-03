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

import { ASSIGN_PRODUCTS, AssignItem } from "../../_components/AssignItem";
import { SimpleListProduct } from "../../_components/SimpleListProduct";
import { useAssignItem, useSimpleListProps } from "../../_components/_hooks";

import { GetProducts } from "../../products/queries";

import { GetCollection } from "../queries";
import {
  CollectionAddProducts,
  CollectionRemoveProducts,
  DeleteCollection,
  UpdateCollection,
} from "../mutations";

import { GeneralInformation } from "../_form";

import { BackgroundImage } from "./_components";

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
  const assignProductsProps = useAssignItem({
    instance: collection,
    listProps,
    params,
    setParams,
    mutation: CollectionAddProducts,
    refetchQuery: GetProducts,
    queryField: "collectionAddProducts",
    querySelector: "products",
    varIdMutation: "collectionId",
    appName: "products",
    vars: "notInCollections",
  });
  const productSimpleListProps = useSimpleListProps({
    instance: collection,
    removeMutation: CollectionRemoveProducts,
    setListProps,
    setParams,
    assignAction: ASSIGN_PRODUCTS,
    appName: "products",
    selector: "products",
    varIdMutation: "collectionId",
    vars: "collections",
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
          <SimpleListProduct {...productSimpleListProps} />
          <Seo {...methods} title={collection.seoTitle} description={collection.seoDescription} />
        </RowGrid>
        <RowGrid>
          <Publish
            {...methods}
            publish={collection.isPublished}
            date={collection.publicationDate}
          />
        </RowGrid>
      </ColGrid>
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
      />
      <AssignItem {...assignProductsProps} type="product" />
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
