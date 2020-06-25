import React from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Template";

const useStyles = makeStyles(
  (theme) => ({
    card: {
      marginBottom: theme.spacing(2),
    },
    highlightedImageContainer: {
      borderColor: theme.palette.primary.main + "!important",
    },
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%",
    },
    imageContainer: {
      background: "#ffffff",
      border: "2px solid #eaeaea",
      borderRadius: theme.spacing(),
      cursor: "pointer",
      height: 48,
      overflow: "hidden",
      padding: theme.spacing(0.5),
      position: "relative",
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(1),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    toolbar: { marginTop: -theme.spacing(0.5) },
  }),
  { name: "ProductImageNavigation" }
);

export const Images = ({ images, mainImage }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card title="Images" useDenese>
      <div className={classes.root}>
        {images.map((image) => (
          <div
            className={clsx({
              [classes.imageContainer]: true,
              [classes.highlightedImageContainer]: image.id === mainImage.id,
            })}
            onClick={() => navigate(`../${image.id}`)}
            key={image.id}
          >
            <img className={classes.image} src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
    </Card>
  );
};
