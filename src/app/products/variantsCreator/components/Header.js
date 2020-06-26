import React from "react";

import { Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const descriptions = {
  0: {
    label: "Choose Values",
    description: "Selected values will be used to create variants for the configurable product.",
  },
  1: {
    label: "Price and Weight",
    description: (totalVariants) =>
      `Based on your selections we will create ${totalVariants} variants. 
      Use this step to customize base price and weight for your new products.`,
  },
  2: {
    label: "Summary",
    description: `Here is the summary of variants that will be created. 
      You can change prices, weight, sku, quantity for each one created.`,
  },
};
const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    headerRoot: {
      display: "flex",
      flexDirection: "column",
    },
    buttonRoot: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      "&>:not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
  }),
  { name: "VariantCreatorHeader" }
);

export const Header = (props) => {
  const { activeStep, setActiveStep, variants } = props;
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreate = () => {};

  const isNextDisabled = variants.length === 0;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.headerRoot}>
          <Typography variant="h5">{descriptions[activeStep].label}</Typography>
          <Typography variant="body2">
            {activeStep === 1
              ? descriptions[activeStep].description(variants.length)
              : descriptions[activeStep].description}
          </Typography>
        </div>
        <div className={classes.buttonRoot}>
          {activeStep !== 0 && (
            <Button color="primary" onClick={handleBack}>
              Previous
            </Button>
          )}
          {activeStep !== 2 && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              Next
            </Button>
          )}
          {activeStep === 2 && (
            <Button color="primary" variant="contained" onClick={handleCreate}>
              Create
            </Button>
          )}
        </div>
      </div>
      <Divider />
    </>
  );
};
