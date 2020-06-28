import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation } from "@/utils/hooks";
import { CREATE_VARIANT } from "@/graphql/mutations/productVariants";
import { GET_PRODUCT_VARIANT_DATA } from "@/graphql/queries/productVariants";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";
import { useSnackbar } from "notistack";
import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { FormAttributes, schema, VariantNavigation } from "../components";
import { maybe } from "@/utils";
import { getErrors, SaveButton } from "@/components/form";
import { FormInventory, FormPricing, FormWeight } from "@/app/products/components";

const Base = ({ product }) => {
  const {
    variants,
    productType: { variantAttributes },
  } = product;
  const templateVariant = maybe(() => variants[0]);
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [create] = useMutation(CREATE_VARIANT);
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
    console.log(attributesValues);
    const newSku = [product.getUniqueSku, ...attributesValues].join("-");
    setValue("sku", newSku);
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
      setError(getErrors(errors));
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
        <VariantNavigation
          variants={product.variants}
          fallbackThumbnail={maybe(() => product.thumbnail.url)}
        />
        <RowGrid>
          <FormAttributes {...methods} attributes={variantAttributes} />
          <FormPricing {...methods} />
          <FormWeight {...methods} />
          <FormInventory {...methods} />
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
      query={GET_PRODUCT_VARIANT_DATA}
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
