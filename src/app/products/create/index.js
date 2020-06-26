import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CREATE_PRODUCT } from "@/graphql/mutations/products";
import { INITIALIZE_PRODUCT_CREATE } from "@/graphql/queries/products";

import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

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
  productType: yup.string().required(),
  category: yup.string().required(),
});

const Base = (props) => {
  const { productTypes } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CREATE_PRODUCT);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productType: undefined,
      category: undefined,
      supplier: undefined,
      collections: [],
      name: "",
      description: "{}",

      attributes: [],

      isPublished: false,
      publicationDate: null,
      seo: {
        title: "",
        description: "",
      },

      sku: "",
      trackInventory: true,
      weight: 0,
      cost: 0,
      price: 0,
      quantity: 0,
    },
  });

  const {
    setError,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
    register,
    unregister,
  } = methods;

  useEffect(() => {
    register("attributes");
    return () => {
      unregister("attributes");
    };
  }, [register, unregister]);

  const productTypeID = watch("productType");
  const productType = productTypes.find((item) => item.node.id === productTypeID);

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        productCreate: { product, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Product ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <>
      <Header title="Create Product" />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} />
          {productType && productType?.node?.productAttributes && (
            <FormAttributes {...props} {...methods} />
          )}
          {productType && !productType?.node?.hasVariants && (
            <>
              <FormPricing {...methods} />
              <FormWeight {...methods} />
              <FormInventory {...methods} />
            </>
          )}
          <SeoForm {...methods} />
        </RowGrid>
        <RowGrid>
          <FormOrganizeProduct {...props} {...methods} />
          <PublishForm {...methods} />
        </RowGrid>
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};

export default () => {
  return (
    <QueryWrapper query={INITIALIZE_PRODUCT_CREATE} fieldName="collections" vars={{}}>
      {({ collections, categories, productTypes, suppliers }) => (
        <Base
          collections={collections.edges}
          categories={categories.edges}
          productTypes={productTypes.edges}
          suppliers={suppliers.edges}
        />
      )}
    </QueryWrapper>
  );
};
