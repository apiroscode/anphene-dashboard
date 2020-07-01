import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { GET_PRODUCT } from "@/graphql/queries/products";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "@/graphql/mutations/products";

import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";
import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";

import { Images } from "./Images";
import { Variants } from "./Variants";

import {
  FormAttributes,
  FormGeneralInformation,
  FormInventory,
  FormOrganizeProduct,
  FormPricing,
  FormWeight,
} from "../components";

const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
});
const getDefaultValues = (product) => {
  const {
    variants,
    productType: { hasVariants },
  } = product;

  let defaultValues = {
    category: product.category?.id,
    supplier: product.supplier?.id,
    collections: product.collections.map((item) => item.id),
    name: product.name,
    description: product.description,
    attributes: product.attributes.map((item) => ({
      id: item.attribute.id,
      values: item.values.map((value) => value.slug),
    })),
    isPublished: product.isPublished,
    publicationDate: product.publicationDate,
    seo: {
      title: product.seoTitle,
      description: product.seoDescription,
    },
  };

  if (!hasVariants) {
    const variant = variants[0];
    defaultValues = {
      ...defaultValues,
      sku: variant.sku,
      trackInventory: variant.trackInventory,
      weight: variant.weight,
      cost: variant.cost,
      price: variant.price,
      quantity: variant.quantity,
    };
  }

  return defaultValues;
};

const Base = (props) => {
  const { product } = props;
  const [update] = useMutation(UPDATE_PRODUCT);
  const { enqueueSnackbar } = useSnackbar();

  const {
    variants,
    productType: { hasVariants },
  } = product;

  const deleteProps = {
    mutation: DELETE_PRODUCT,
    id: product.id,
    name: product.name,
    field: "productDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(product),
    resolver: yupResolver(schema),
  });

  const {
    setError,
    reset,
    handleSubmit,
    register,
    unregister,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    register("attributes");
    return () => {
      unregister("attributes");
    };
  }, [register, unregister]);

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: product.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        productUpdate: { product: updatedProduct, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Product ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedProduct));
    }
  };

  return hasVariants && variants.length === 0 ? (
    <Navigate to="variants-creator" />
  ) : (
    <>
      <Header title={`Update ${product.name}`} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} product={product} />
          <Images product={product} handleSubmit={handleSubmit} />
          {!hasVariants ? (
            <>
              <FormAttributes {...props} {...methods} />
              <FormPricing {...methods} />
              <FormWeight {...methods} />
              <FormInventory {...props} {...methods} />
            </>
          ) : (
            <Variants {...props} />
          )}
          <SeoForm {...methods} />
        </RowGrid>
        <RowGrid>
          <FormOrganizeProduct {...props} {...methods} />
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
    <QueryWrapper
      query={GET_PRODUCT}
      id={id}
      fieldName="product"
      queryOptions={{
        fetchPolicy: "network-only",
      }}
    >
      {(data) => (
        <Base
          product={data?.product}
          collections={data?.collections.edges}
          categories={data?.categories.edges}
          suppliers={data?.suppliers.edges}
        />
      )}
    </QueryWrapper>
  );
};
