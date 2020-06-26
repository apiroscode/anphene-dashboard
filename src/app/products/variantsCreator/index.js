import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QueryWrapper } from "@/components/Template";
import { GET_PRODUCT_VARIANTS } from "@/graphql/queries/products";
import { Header, Tabs, Values } from "./components";
import { makeStyles } from "@material-ui/core/styles";

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
  const [activeStep, setActiveStep] = useState(0);
  const [variants, setVariants] = useState([]);
  const classes = useStyles();
  const baseProps = {
    product,
    activeStep,
    setActiveStep,
    variants,
    setVariants,
  };

  return (
    <div className={classes.root}>
      <Tabs step={activeStep} />
      <Header {...baseProps} />
      {activeStep === 0 && <Values {...baseProps} />}
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
