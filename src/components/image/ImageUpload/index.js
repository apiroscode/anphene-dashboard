import React, { useCallback } from "react";

import clsx from "clsx";
import { useDropzone } from "react-dropzone";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import ImageIcon from "../../icons/Image";

const useStyles = makeStyles(
  (theme) => ({
    backdrop: {
      background: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
    fileField: {
      display: "none",
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      height: 148,
      justifySelf: "start",
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      transition: theme.transitions.duration.standard + "s",
      width: 148,
    },
    photosIcon: {
      height: "64px",
      margin: "0 auto",
      width: "64px",
    },
    photosIconContainer: {
      padding: theme.spacing(5, 0),
      textAlign: "center",
    },
    uploadText: {
      color: theme.typography.body1.color,
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
    },
  }),
  { name: "ImageUpload" }
);

export const ImageUpload = (props) => {
  const {
    children,
    className,
    iconContainerActiveClassName,
    iconContainerClassName,
    isActiveClassName,
    onImageUpload,
  } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageUpload(acceptedFiles);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const classes = useStyles(props);

  return (
    <>
      <div
        {...getRootProps()}
        className={clsx(className, classes.photosIconContainer, {
          [classes.backdrop]: isDragActive,
          [isActiveClassName]: isDragActive,
        })}
      >
        <div
          className={clsx(iconContainerClassName, {
            [iconContainerActiveClassName]: isDragActive,
          })}
        >
          <input {...getInputProps()} className={classes.fileField} accept="image/*" />
          <ImageIcon className={classes.photosIcon} />
          <Typography className={classes.uploadText}>Drop here to upload</Typography>
        </div>
      </div>
      {children && children({ isDragActive })}
    </>
  );
};
