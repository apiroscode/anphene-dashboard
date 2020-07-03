import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetProductImageById } from "../queries";
import { DeleteProductImage, UpdateProductImage } from "../mutations";

import { ImagesNavigation, ImageView } from "./_components";
import { ImageInformation } from "./_form";

const Base = ({ product }) => {
  const { id: productId, name, mainImage, images } = product;
  const [update] = useMutation(UpdateProductImage);
  const { enqueueSnackbar } = useSnackbar();
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);

  const deleteProps = {
    mutation: DeleteProductImage,
    id: mainImage.id,
    name: "this product",
    field: "productImageDelete",
    backUrl: `/products/${productId}`,
  };

  const methods = useForm({
    defaultValues: { alt: mainImage.alt },
  });

  const {
    setError,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    setHeaderBackLabel({
      label: name,
      link: `/products/${productId}`,
    });

    return () => setHeaderBackLabel(undefined);
  }, [productId, name, setHeaderBackLabel]);

  useEffect(() => {
    reset({
      alt: mainImage.alt,
    });
  }, [mainImage.alt, reset]);

  const onSubmit = async (data) => {
    const result = await update({
      variables: {
        id: mainImage.id,
        alt: data.alt,
      },
    });
    if (result === undefined) return;

    const {
      data: {
        productImageUpdate: { image: updatedImage, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`This image successfully updated.`, {
        variant: "success",
      });
      reset({ alt: updatedImage.alt });
    }
  };

  return (
    <>
      <Header title="Edit Photo" />
      <ColGrid reverse>
        <RowGrid>
          <ImagesNavigation images={images} mainImage={mainImage} />
          <ImageInformation {...methods} />
        </RowGrid>
        <ImageView mainImage={mainImage} />
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
  const { id: productId, imageId } = useParams();

  return (
    <QueryWrapper query={GetProductImageById} vars={{ productId, imageId }} fieldName="product">
      {(data) => <Base product={data.product} />}
    </QueryWrapper>
  );
};
