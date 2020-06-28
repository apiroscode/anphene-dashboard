import React, { useState } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useMutation, useQS } from "@/utils/hooks";

import { GET_PRODUCTS } from "@/graphql/queries/products";
import { GET_COLLECTION } from "@/graphql/queries/collections";
import {
  COLLECTION_ADD_PRODUCTS,
  COLLECTION_REMOVE_PRODUCTS,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
} from "@/graphql/mutations/collections";

import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { ACTION, AssignProducts } from "@/app/components/AssignProducts";
import { ProductSimpleList } from "@/app/components/ProductSimpleList";
import { FormGeneralInformation } from "../components";
import { BackgroundImage } from "./BackgroundImage";

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
  const [params, setParams] = useQS({ action: undefined });
  const [update] = useMutation(UPDATE_COLLECTION);
  const [addProducts, { loading: addLoading }] = useMutation(COLLECTION_ADD_PRODUCTS);
  const [removeProducts, { loading: removeLoading }] = useMutation(COLLECTION_REMOVE_PRODUCTS);
  const [listProps, setListProps] = useState();

  const action = (
    <Button color="primary" onClick={() => setParams({ action: ACTION })}>
      ASSIGN PRODUCT
    </Button>
  );

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

  const onCloseDialog = () => {
    setParams({ action: undefined });
  };

  const onAssignProduct = async (selected) => {
    const result = await addProducts({
      variables: { collectionId: collection.id, products: selected },
      refetchQueries: [
        {
          query: GET_PRODUCTS,
          variables: {
            ...listProps,
          },
        },
      ],
    });
    if (result === undefined) return;

    const {
      data: {
        collectionAddProducts: { errors },
      },
    } = result;

    if (errors.length > 0) {
    } else {
      enqueueSnackbar(`The products has been added successfully.`, {
        variant: "success",
      });
      onCloseDialog();
    }
  };

  const deleteProps = {
    mutation: DELETE_COLLECTION,
    id: collection.id,
    name: collection.name,
    field: "collectionDelete",
  };

  const assignProductProps = {
    params,
    title: "Assign ProductSimpleList",
    onClose: onCloseDialog,
    onAssign: onAssignProduct,
    loading: addLoading,
    vars: {
      notInCollections: [collection.id],
    },
  };

  const productsProps = {
    setListProps,
    title: `Products in ${collection.name}`,
    action,
    vars: { collections: [collection.id] },
    bulkLoading: removeLoading,
    bulkMutations: [
      {
        mutation: removeProducts,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
        selector: "products",
        vars: {
          collectionId: collection.id,
        },
      },
    ],
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
          <ProductSimpleList {...productsProps} />
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
      <AssignProducts {...assignProductProps} />
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
