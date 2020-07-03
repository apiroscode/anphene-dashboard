import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, Publish, SaveButton, Seo } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { CreateProduct } from "../mutations";
import { InitializeProductCreate } from "../queries";

import {
  Attributes,
  GeneralInformation,
  Inventory,
  OrganizeProduct,
  Pricing,
  Weight,
} from "../_form";

const schema = yup.object().shape({
  name: yup.string().required(),
  productType: yup.string().required(),
  category: yup.string().required(),
});

const Base = (props) => {
  const { productTypes } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CreateProduct);

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
      getErrors(errors, setError);
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
          <GeneralInformation {...methods} />
          {productType && productType?.node?.productAttributes && (
            <Attributes {...props} {...methods} />
          )}
          {productType && !productType?.node?.hasVariants && (
            <>
              <Pricing {...methods} />
              <Weight {...methods} />
              <Inventory {...methods} useGenerator />
            </>
          )}
          <Seo {...methods} />
        </RowGrid>
        <RowGrid>
          <OrganizeProduct {...props} {...methods} />
          <Publish {...methods} />
        </RowGrid>
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};

export default () => {
  return (
    <QueryWrapper query={InitializeProductCreate} fieldName="collections" vars={{}}>
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
