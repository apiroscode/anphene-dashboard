import React, { useState } from "react";

import arrayMove from "array-move";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@/utils/hooks";

import {
  CREATE_PRODUCT_IMAGE,
  DELETE_PRODUCT_IMAGE,
  REORDER_PRODUCT_IMAGE,
} from "@/graphql/mutations/productsImages";

import { ButtonUpload } from "@/components/Button/ButtonUpload";
import { ImageUpload } from "@/components/image";
import { Card } from "@/components/Template";

import { createMultiFileUploadHandler, ImageListContainer } from "./components";

export const Images = (props) => {
  const {
    product: { id: productId, images },
    handleSubmit,
  } = props;
  const navigate = useNavigate();

  const [createImage] = useMutation(CREATE_PRODUCT_IMAGE);
  const [deleteImage] = useMutation(DELETE_PRODUCT_IMAGE);
  const [reorderImage] = useMutation(REORDER_PRODUCT_IMAGE);
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const onSortEnd = ({ newIndex, oldIndex }) => {
    let ids = images.map((image) => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);

    const productImagesMap = images.reduce((prev, curr) => {
      prev[curr.id] = curr;
      return prev;
    }, {});

    const newProductImages = ids.map((id, index) => ({
      __typename: "ProductImage",
      ...productImagesMap[id],
      sortOrder: index,
    }));

    const optimisticResponse = {
      productImageReorder: {
        __typename: "ProductImageReorder",
        errors: null,
        product: {
          __typename: "Product",
          id: productId,
          images: newProductImages,
        },
      },
    };
    reorderImage({ variables: { imagesIds: ids, productId }, optimisticResponse });
  };

  const onImageEdit = async (id) => {
    navigate(`images/${id}`);
  };

  const onImageDelete = async (id) => {
    await deleteImage({
      variables: { id },
    });
  };

  const onImageUpload = async (file) => {
    await createImage({
      variables: {
        input: { product: productId, image: file },
      },
    });
  };

  const handleImageUpload = createMultiFileUploadHandler(onImageUpload, {
    onAfterUpload: () => setImagesToUpload((prevImagesToUpload) => prevImagesToUpload.slice(1)),
    onStart: (files) => {
      Array.from(files).forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagesToUpload((prevImagesToUpload) => [
            ...prevImagesToUpload,
            {
              __typename: "ProductImage",
              alt: "",
              id: "",
              sortOrder: fileIndex,
              url: event.target.result,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const handleImageUploadSubmit = (files) => {
    handleSubmit(() => handleImageUpload(files))();
  };

  return (
    <Card
      title="Images"
      useMargin
      useDense={images.length === 0}
      action={<ButtonUpload handleImageUpload={handleImageUploadSubmit} multiple />}
    >
      {images.length === 0 ? (
        <ImageUpload onImageUpload={handleImageUploadSubmit} multiple />
      ) : (
        <ImageListContainer
          distance={20}
          helperClass="dragged"
          axis="xy"
          items={images}
          preview={imagesToUpload}
          onSortEnd={onSortEnd}
          onImageDelete={onImageDelete}
          onImageEdit={onImageEdit}
        />
      )}
    </Card>
  );
};
