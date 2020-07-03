import React from "react";
import clsx from "clsx";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const steps = ["Select AttributeValues", "Base Information", "Summary"];

const useStyles = makeStyles(
  (theme) => ({
    label: {
      fontSize: 14,
      textAlign: "center",
    },
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: "flex",
      justifyContent: "space-between",
    },
    tab: {
      flex: 1,
      paddingBottom: theme.spacing(),
      userSelect: "none",
    },
    tabActive: {
      fontWeight: 600,
    },
    tabVisited: {
      borderBottom: `3px solid ${theme.palette.primary.main}`,
    },
  }),
  {
    name: "Tabs",
  }
);

export const Tabs = (props) => {
  const { step: currentStep } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {steps.map((step, stepIndex) => {
        const visitedStep = stepIndex <= currentStep;

        return (
          <div
            className={clsx(classes.tab, {
              [classes.tabActive]: stepIndex === currentStep,
              [classes.tabVisited]: visitedStep,
            })}
            key={step}
          >
            <Typography className={classes.label} variant="caption">
              {step}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
