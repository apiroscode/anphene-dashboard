import React from "react";

import clsx from "clsx";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%",
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      cursor: "pointer",
      height: theme.spacing(21.5),
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      transitionDuration: theme.transitions.duration.standard + "ms",
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      gridTemplateColumns: "repeat(3, 1fr)",
      maxWidth: "100%",
      width: theme.breakpoints.values.lg,
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
    },
    selectedImageContainer: {
      borderColor: theme.palette.primary.main,
    },
  }),
  { name: "ProductVariantImageSelectDialog" }
);

export const ImageSelectDialog = (props) => {
  const { images, open, selectedImages, onClose, onImageSelect } = props;
  const classes = useStyles(props);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Image Selection</DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          {images
            .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
            .map((tile) => {
              return (
                <div
                  className={clsx([
                    classes.imageContainer,
                    {
                      [classes.selectedImageContainer]:
                        selectedImages.filter((item) => item.id === tile.id).length > 0,
                    },
                  ])}
                  onClick={() => onImageSelect(tile.id)}
                  key={tile.id}
                >
                  <img className={classes.image} src={tile.url} alt="" />
                </div>
              );
            })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
      </DialogActions>
    </Dialog>
  );
};
