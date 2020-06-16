import React from "react";

import { BackgroundImageForm } from "@/components/form";

export const BackgroundImage = (props) => {
  const { id, update, enqueueSnackbar, reset } = props;

  const submitUpload = async (backgroundImage) => {
    const result = await update({
      variables: {
        id: id,
        input: { backgroundImage, backgroundImageAlt: "" },
      },
      ignoreResults: true,
    });
    if (result === undefined) return;

    const {
      data: {
        collectionUpdate: { collection: updatedCollection, errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(
        `Collection ${updatedCollection.name} image successfully ${
          backgroundImage === null ? "deleted" : "updated"
        }.`,
        {
          variant: "success",
        }
      );
      reset({
        name: updatedCollection.name,
        description: updatedCollection.description,
        seo: {
          title: updatedCollection.seoTitle,
          description: updatedCollection.seoDescription,
        },
        backgroundImageAlt: updatedCollection?.backgroundImage?.alt || "",
        isPublished: updatedCollection.isPublished,
        publicationDate: updatedCollection.publicationDate,
      });
    }
  };

  return <BackgroundImageForm {...props} submitUpload={submitUpload} />;
};
