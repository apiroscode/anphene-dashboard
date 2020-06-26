import React, { useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { useObjectState } from "@/utils/hooks";

import { GET_PRODUCT_VARIANTS } from "@/graphql/queries/products";

import { QueryWrapper } from "@/components/Template";

import { Header, Information, Summary, Tabs, Values } from "./components";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      "&>:not(:last-child)": {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
          marginBottom: theme.spacing(2),
        },
      },
    },
  }),
  { name: "VariantsCreator" }
);

const Base = ({ product }) => {
  const {
    productType: { variantAttributes },
    variants: productVariants,
  } = product;
  const defaultTempValues = variantAttributes.map((attribute) => ({
    id: attribute.id,
    values: [],
    sortingValues: attribute.values.map((value) => value.slug),
    displayValues: attribute.values.reduce((result, attribute) => {
      result[attribute.slug] = attribute.name;
      return result;
    }, {}),
  }));

  const [activeStep, setActiveStep] = useState(0);
  const [variants, setVariants] = useState([]);
  const [values, setValues] = useState(defaultTempValues);
  const [info, setInfo] = useObjectState({
    cost: 0,
    price: 0,
    weight: 100,
    quantity: 0,
  });
  const classes = useStyles();
  const baseProps = {
    product,
    activeStep,
    setActiveStep,
    variants,
    setVariants,
    values,
    setValues,
    info,
    setInfo,
  };

  useEffect(() => {
    if (variants.length === 0) {
      setActiveStep(0);
    }
  }, [variants]);

  return productVariants.length > 0 ? (
    <Navigate to=".." />
  ) : (
    <div className={classes.root}>
      <Tabs step={activeStep} />
      <Header {...baseProps} />
      {activeStep === 0 && <Values {...baseProps} />}
      {activeStep === 1 && <Information {...baseProps} />}
      {activeStep === 2 && <Summary {...baseProps} />}
    </div>
  );
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper query={GET_PRODUCT_VARIANTS} id={id} fieldName="product">
      {(data) => <Base product={data?.product} />}
    </QueryWrapper>
  );
};
