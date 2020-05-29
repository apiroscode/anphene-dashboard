import React from "react";
import clsx from "clsx";

import { Box, Divider, Card as CardMui, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      overflow: "visible",
      // border: "1px solid #EAEAEA",
    },
    title: {
      lineHeight: 1,
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    content: {
      "&>:not(:last-child)": {
        marginBottom: theme.spacing(3),
      },
    },
  }),
  { name: "CARD" }
);

export const Card = (props) => {
  const classes = useStyles();
  const { title, action, densePadding, useMargin, children } = props;

  return (
    <CardMui>
      <Box display="flex" flexDirection="column">
        {(title || action) && (
          <>
            <Box
              display="flex"
              alignItems="center"
              paddingLeft={2}
              paddingRight={2}
              minHeight={56}
            >
              {title && (
                <Box>
                  <Typography variant="h5" className={classes.title}>
                    {title}
                  </Typography>
                </Box>
              )}
              {action && <Box marginLeft="auto">{action}</Box>}
            </Box>
            <Divider />
          </>
        )}
        <Box padding={densePadding ? 0 : 2} className={clsx({ [classes.content]: useMargin })}>
          {children}
        </Box>
      </Box>
    </CardMui>
  );
};
