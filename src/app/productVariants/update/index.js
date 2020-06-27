import React, { useEffect } from "react";
import { GET_VARIANT } from "@/graphql/queries/productVariants";
import { useParams } from "react-router-dom";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";
import { useStoreActions } from "easy-peasy";
import { VariantNavigation, FormAttributes } from "../components";
import { maybe } from "@/utils";
import {
  DELETE_VARIANT,
  UPDATE_VARIANT,
  VARIANT_IMAGE_ASSIGN,
  VARIANT_IMAGE_UNASSIGN,
} from "@/graphql/mutations/productVariants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useMutation } from "@/utils/hooks";
import { useSnackbar } from "notistack";
import { getErrors, SaveButton } from "@/components/form";
import { FormInventory, FormPricing, FormWeight } from "@/app/products/components";
import { Images } from "./Images";
const getDefaultValues = (variant) => ({
  attributes: variant.attributes.map((attribute) => ({
    id: attribute.attribute.id,
    values: attribute.values.map((value) => value.slug),
  })),
  sku: variant.sku,
  price: variant.price,
  cost: variant.cost,
  trackInventory: variant.trackInventory,
  weight: variant.weight,
  quantity: variant.quantity,
});

const schema = yup.object().shape({
  sku: yup.string().required(),
  price: yup.number().required(),
  cost: yup.number().required(),
  weight: yup.number().required(),
  quantity: yup.number().required(),
});

const Base = ({ variant }) => {
  const { product, name } = variant;
  const [update] = useMutation(UPDATE_VARIANT);
  const [assignImage, { loading: assignLoading }] = useMutation(VARIANT_IMAGE_ASSIGN);
  const [unAssignImage, { loading: unAssignLoading }] = useMutation(VARIANT_IMAGE_UNASSIGN);

  const { enqueueSnackbar } = useSnackbar();
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);

  const deleteProps = {
    mutation: DELETE_VARIANT,
    id: variant.id,
    name: variant.name || variant.sku,
    field: "productVariantDelete",
    backUrl: `/products/${product.id}`,
  };

  const methods = useForm({
    defaultValues: getDefaultValues(variant),
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
    setHeaderBackLabel({
      label: product.name,
      link: `/products/${product.id}`,
    });

    return () => setHeaderBackLabel(undefined);
  }, [product, setHeaderBackLabel]);

  useEffect(() => {
    reset(getDefaultValues(variant));
  }, [variant, reset]);

  useEffect(() => {
    register("attributes");
    return () => {
      unregister("attributes");
    };
  }, [register, unregister]);

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: variant.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        productVariantUpdate: { productVariant: updatedVariant, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(
        `Variant ${updatedVariant.name || updatedVariant.sku} successfully updated.`,
        {
          variant: "success",
        }
      );
      reset(getDefaultValues(updatedVariant));
    }
  };

  return (
    <>
      <Header title={name} />
      <ColGrid reverse>
        <VariantNavigation
          variants={product.variants}
          variantId={variant.id}
          fallbackThumbnail={maybe(() => product.thumbnail.url)}
        />
        <RowGrid>
          <FormAttributes {...methods} variant={variant} />
          <Images variant={variant} assignImage={assignImage} unAssignImage={unAssignImage} />
          <FormPricing {...methods} />
          <FormWeight {...methods} />
          <FormInventory {...methods} variant={variant} />
        </RowGrid>
      </ColGrid>
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting || assignLoading || unAssignLoading}
        disabled={!isDirty}
      />
    </>
  );
};

export default () => {
  const { variantId } = useParams();

  return (
    <QueryWrapper
      query={GET_VARIANT}
      id={variantId}
      fieldName="productVariant"
      queryOptions={{
        fetchPolicy: "network-only",
      }}
    >
      {(data) => <Base variant={data?.productVariant} />}
    </QueryWrapper>
  );
};
