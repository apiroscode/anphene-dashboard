import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";

const useStyles = makeStyles(
  (theme) => ({
    image: {
      height: "100%",
      objectFit: "contain",
      width: "100%",
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      margin: `0 auto ${theme.spacing(2)}px`,
      maxWidth: 552,
      padding: theme.spacing(2),
    },
  }),
  { name: "ImageView" }
);

export const ImageView = ({ mainImage }) => {
  const classes = useStyles();

  return (
    <Card title="Image View">
      <div className={classes.imageContainer}>
        <img src={mainImage.url} className={classes.image} alt={mainImage.alt} />
      </div>
    </Card>
  );
};
