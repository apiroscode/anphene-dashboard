import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { maybe } from "@/utils";
import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { Inventory, Pricing, Weight } from "../../products/_form";

import { CreateVariant } from "../mutations";
import { InitializeVariantCreate } from "../queries";

import { VariantsNavigation } from "../_components";
import { Attributes, schema } from "../_form";

const Base = ({ product }) => {
  const {
    variants,
    productType: { variantAttributes },
  } = product;
  const templateVariant = maybe(() => variants[0]);
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [create] = useMutation(CreateVariant);
  const methods = useForm({
    defaultValues: {
      attributes: variantAttributes.map((attribute) => ({
        id: attribute.id,
        values: [],
      })),
      sku: "",
      price: templateVariant ? templateVariant.price : 0,
      cost: templateVariant ? templateVariant.cost : 0,
      trackInventory: templateVariant ? templateVariant.trackInventory : true,
      weight: templateVariant ? templateVariant.weight : 0,
      quantity: templateVariant ? templateVariant.quantity : 0,
    },
    resolver: yupResolver(schema),
  });

  const {
    setError,
    handleSubmit,
    register,
    unregister,
    formState: { isSubmitting, isDirty },
    watch,
    setValue,
  } = methods;

  const attributes = watch("attributes");

  useEffect(() => {
    setHeaderBackLabel({
      label: product.name,
      link: `/products/${product.id}`,
    });

    return () => setHeaderBackLabel(undefined);
  }, [product, setHeaderBackLabel]);

  useEffect(() => {
    register("attributes");
    return () => {
      unregister("attributes");
    };
  }, [register, unregister]);

  useEffect(() => {
    const attributesValues = attributes
      .filter((item) => item.values.length > 0)
      .map((item) => item.values[0].substr(0, 3).toUpperCase());

    const newSku = [product.getUniqueSku, ...attributesValues].join("-");
    setValue("sku", newSku, { shouldValidate: true, shouldDirty: true });
  }, [attributes, product.getUniqueSku, setValue]);

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: { ...data, product: product.id } } });
    if (result === undefined) return;

    const {
      data: {
        productVariantCreate: { productVariant, errors },
      },
    } = result;
    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Variant ${productVariant.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${productVariant.id}`);
    }
  };

  return (
    <>
      <Header title="Create Variant" />
      <ColGrid reverse>
        <VariantsNavigation
          variants={product.variants}
          fallbackThumbnail={maybe(() => product.thumbnail.url)}
        />
        <RowGrid>
          <Attributes {...methods} attributes={variantAttributes} />
          <Pricing {...methods} />
          <Weight {...methods} />
          <Inventory {...methods} />
        </RowGrid>
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper
      query={InitializeVariantCreate}
      id={id}
      fieldName="product"
      queryOptions={{
        fetchPolicy: "network-only",
      }}
    >
      {(data) => <Base product={data?.product} />}
    </QueryWrapper>
  );
};
