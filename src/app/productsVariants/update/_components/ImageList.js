import React, { useState } from "react";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";

import { ImageSelectDialog } from "./ImageSelectDialog";

const useStyles = makeStyles(
  (theme) => ({
    helpText: {
      gridColumnEnd: "span 4",
    },
    image: {
      height: "100%",
      objectFit: "contain",
      width: "100%",
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      height: theme.spacing(17.5),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  }),
  { name: "ImagesNavigation" }
);

export const ImageList = (props) => {
  const { variant, assignImage, unAssignImage } = props;
  const {
    images,
    product: { images: productImages },
  } = variant;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onImageSelect = async (imageId) => {
    if (variant.images && variant.images.map((image) => image.id).indexOf(imageId) !== -1) {
      unAssignImage({
        variables: {
          imageId,
          variantId: variant.id,
        },
      });
    } else {
      assignImage({
        variables: {
          imageId,
          variantId: variant.id,
        },
      });
    }
  };

  const dialogProps = {
    open,
    onClose,
    selectedImages: images,
    images: productImages,
    onImageSelect,
  };

  return (
    <Card
      title="ImageList"
      action={
        <Button color="primary" onClick={onOpen} disabled={open}>
          Choose ImageList
        </Button>
      }
    >
      <div className={classes.root}>
        {images.length > 0 ? (
          images
            .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
            .map((tile) => (
              <div className={classes.imageContainer} key={tile.id}>
                <img className={classes.image} src={tile.url} alt="" />
              </div>
            ))
        ) : (
          <Typography variant="body1" className={classes.helpText}>
            Select a specific variant image from product images
          </Typography>
        )}
      </div>
      <ImageSelectDialog {...dialogProps} />
    </Card>
  );
};
