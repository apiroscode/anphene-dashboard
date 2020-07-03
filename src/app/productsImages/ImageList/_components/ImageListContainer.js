import React from "react";

import { SortableContainer } from "react-sortable-hoc";

import { makeStyles } from "@material-ui/core/styles";

import { ImageTile } from "@/components/ImageTile";

import { SortableImage } from "./SortableImage";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      gridTemplateColumns: "repeat(4, 1fr)",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
    },
  }),
  { name: "ImageListContainer" }
);

export const ImageListContainer = SortableContainer(
  ({ items, preview, onImageDelete, onImageEdit, ...props }) => {
    const classes = useStyles();

    return (
      <div {...props} className={classes.root}>
        {items.map((image, index) => (
          <SortableImage
            key={`item-${index}`}
            index={index}
            image={image}
            onImageEdit={() => onImageEdit(image.id)}
            onImageDelete={() => onImageDelete(image.id)}
          />
        ))}
        {preview
          .sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1))
          .map((image, idx) => (
            <ImageTile key={idx} loading={true} image={image} />
          ))}
      </div>
    );
  }
);
