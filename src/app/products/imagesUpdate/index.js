import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useMutation } from "@/utils/hooks";

import { GET_PRODUCT_IMAGE_BY_ID } from "@/graphql/queries/productsImages";
import { DELETE_PRODUCT_IMAGE, UPDATE_PRODUCT_IMAGE } from "@/graphql/mutations/productsImages";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { ImageInformation } from "./ImageInformation";
import { Images } from "./Images";
import { ImageView } from "./ImageView";

const Base = ({ product }) => {
  const { id: productId, name, mainImage, images } = product;
  const [update] = useMutation(UPDATE_PRODUCT_IMAGE);
  const { enqueueSnackbar } = useSnackbar();
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);

  const deleteProps = {
    mutation: DELETE_PRODUCT_IMAGE,
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
  }, [mainImage, reset]);

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
      setError(getErrors(errors));
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
          <Images images={images} mainImage={mainImage} />
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
    <QueryWrapper
      query={GET_PRODUCT_IMAGE_BY_ID}
      vars={{ productId, imageId }}
      fieldName="product"
    >
      {(data) => <Base product={data.product} />}
    </QueryWrapper>
  );
};
