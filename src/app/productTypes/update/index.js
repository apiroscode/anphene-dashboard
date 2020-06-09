import React from "react";
import { Header, QueryWrapper, RowGrid } from "@/components/Template";
import { GET_PRODUCT_TYPE } from "@/graphql/queries/productTypes";
import { useParams } from "react-router";
import { DELETE_PRODUCT_TYPE, UPDATE_PRODUCT_TYPE } from "@/graphql/mutations/productTypes";
import { useMutation } from "@/utils/hooks";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FormGeneralInformation, schema } from "../components";
import { yupResolver } from "@hookform/resolvers";
import { getErrors, SaveButton } from "@/components/form";
import { Attributes } from "./Attributes";

const Base = ({ productType }) => {
  const [update] = useMutation(UPDATE_PRODUCT_TYPE);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_PRODUCT_TYPE,
    id: productType.id,
    name: productType.name,
    field: "productTypeDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: productType.name,
      hasVariants: productType.hasVariants,
    },
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
        ...data,
      },
    });
    if (result === undefined) return;

    const {
      data: {
        productTypeUpdate: { productType: updatedProductType, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Product type ${updatedProductType.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: updatedProductType.name,
        hasVariants: updatedProductType.hasVariants,
      });
    }
  };
  return (
    <>
      <Header title={`Update ${productType.name}`} />
      <RowGrid>
        <FormGeneralInformation {...methods} />
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
    <QueryWrapper query={GET_PRODUCT_TYPE} id={id} fieldName="productType">
      {(data) => <Base productType={data?.productType} />}
    </QueryWrapper>
  );
};
