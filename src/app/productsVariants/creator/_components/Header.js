import React from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation } from "@/utils/hooks";

import { Button } from "@/components/Button";

import { BulkCreateVariant } from "../../mutations";

const descriptions = {
  0: {
    label: "Choose AttributeValues",
    description: "Selected values will be used to create variants for the configurable product.",
  },
  1: {
    label: "Base Information",
    description: (totalVariants) =>
      `Based on your selections we will create ${totalVariants} variants. 
      Use this step to customize base attributes for your new product.`,
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
  const { activeStep, setActiveStep, variants, product } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStyles();

  const [create, { loading }] = useMutation(BulkCreateVariant);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreate = async () => {
    const normalizeVariants = variants.map((variant) => ({
      ...variant,
      attributes: variant.attributes.map((attribute) => ({
        id: attribute.id,
        values: attribute.values,
      })),
    }));

    const result = await create({
      variables: { product: product.id, variants: normalizeVariants },
    });
    if (result === undefined) return;

    const {
      data: {
        productVariantBulkCreate: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Variants for product ${product.name} successfully created.`, {
        variant: "success",
      });
      navigate("..");
    }
  };

  const isNextDisabled = variants.length === 0;
  const isCreateDisabled =
    variants.length > 0 && variants.map((item) => item.sku).every((item) => !item);
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
            <Button color="primary" onClick={handleBack} loading={loading}>
              Previous
            </Button>
          )}
          {activeStep !== 2 && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleNext}
              disabled={isNextDisabled}
              loading={loading}
            >
              Next
            </Button>
          )}
          {activeStep === 2 && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCreate}
              disabled={isCreateDisabled}
              loading={loading}
            >
              Create
            </Button>
          )}
        </div>
      </div>
      <Divider />
    </>
  );
};
