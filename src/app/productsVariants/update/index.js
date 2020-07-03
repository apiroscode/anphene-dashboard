import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { maybe } from "@/utils";
import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetVariant } from "../queries";
import {
  AssignVariantImage,
  DeleteVariant,
  UnassignVariantImage,
  UpdateVariant,
} from "../mutations";

import { Inventory, Pricing, Weight } from "../../products/_form";
import { VariantsNavigation } from "../_components";
import { Attributes, schema } from "../_form";
import { ImageList } from "./_components";

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

const Base = ({ variant }) => {
  const { product, name } = variant;
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);
  const { enqueueSnackbar } = useSnackbar();
  const [update] = useMutation(UpdateVariant);
  const [assignImage, { loading: assignLoading }] = useMutation(AssignVariantImage);
  const [unAssignImage, { loading: unAssignLoading }] = useMutation(UnassignVariantImage);

  const deleteProps = {
    mutation: DeleteVariant,
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
      getErrors(errors, setError);
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
        <VariantsNavigation
          variants={product.variants}
          variantId={variant.id}
          fallbackThumbnail={maybe(() => product.thumbnail.url)}
        />
        <RowGrid>
          <Attributes {...methods} attributes={variant.attributes} />
          <ImageList variant={variant} assignImage={assignImage} unAssignImage={unAssignImage} />
          <Pricing {...methods} />
          <Weight {...methods} />
          <Inventory {...methods} variant={variant} />
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
      query={GetVariant}
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
