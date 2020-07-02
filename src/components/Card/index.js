import React from "react";

import { Card as CardMui, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    content: {
      "&>:not(:last-child)": {
        marginBottom: theme.spacing(2),
      },
    },
    rootHeader: {
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      minHeight: 56,
    },
    title: {
      lineHeight: 1,
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    action: {
      marginLeft: "auto",
    },
    body: ({ useDense, useMargin }) => ({
      padding: useDense ? theme.spacing(0) : theme.spacing(3),
      "&>:not(:last-child)": {
        marginBottom: useMargin ? theme.spacing(2) : 0,
      },
    }),
  }),
  { name: "Card" }
);

export const Card = (props) => {
  const { title, action, useDense, useMargin, children } = props;
  const classes = useStyles({ useDense, useMargin });

  return (
    <CardMui>
      <div className={classes.rootHeader}>
        {(title || action) && (
          <>
            <div className={classes.header}>
              {title && (
                <div>
                  <Typography variant="h5" className={classes.title}>
                    {title}
                  </Typography>
                </div>
              )}
              {action && <div className={classes.action}>{action}</div>}
            </div>
            <Divider />
          </>
        )}
        <div className={classes.body}>{children}</div>
      </div>
    </CardMui>
  );
};
