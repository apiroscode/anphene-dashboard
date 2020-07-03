import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetProductType } from "../queries";
import { DeleteProductType, UpdateProductType } from "../mutations";

import { GeneralInformation, schema } from "../_form";
import { Attributes } from "./_components/Attributes";

const getDefaultValues = (productType) => ({
  name: productType.name,
  hasVariants: productType.hasVariants,
});

const Base = ({ productType }) => {
  const [update] = useMutation(UpdateProductType);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteProductType,
    id: productType.id,
    name: productType.name,
    field: "productTypeDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(productType),
    resolver: yupResolver(schema),
  });

  const {
    setError,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({
      variables: {
        id: productType.id,
        input: data,
      },
    });
    if (result === undefined) return;

    const {
      data: {
        productTypeUpdate: { productType: updatedProductType, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Product type ${updatedProductType.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedProductType));
    }
  };
  return (
    <>
      <Header title={`Update ${productType.name}`} />
      <RowGrid>
        <GeneralInformation {...methods} />
        <Attributes productType={productType} type="PRODUCT" />
        {productType.hasVariants && <Attributes productType={productType} type="VARIANT" />}
      </RowGrid>
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
    <QueryWrapper query={GetProductType} id={id} fieldName="productType">
      {(data) => <Base productType={data?.productType} />}
    </QueryWrapper>
  );
};
