import React from "react";

import { BackgroundImage as BackgroundImageForm } from "@/components/_form";

import { getDefaultValues } from "./index";

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
      reset(getDefaultValues(updatedCollection));
    }
  };

  return <BackgroundImageForm {...props} submitUpload={submitUpload} />;
};
