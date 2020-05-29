import React from "react";
import { Box, CircularProgress, makeStyles, Typography } from "@material-ui/core";

import { useDelayed } from "@/utils/hooks";
import { DELAYED_TIMEOUT } from "@/config/constants";

const useStyles = makeStyles((theme) => ({
  caption: {
    marginTop: theme.spacing(2),
    letterSpacing: 4,
    textTransform: "uppercase",
  },
}));

export const Loading = () => {
  const delayed = useDelayed(DELAYED_TIMEOUT);

  const classes = useStyles();
  return delayed(() => (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      color="grey.700"
    >
      <CircularProgress size={50} thickness={2} />
      <Typography className={classes.caption}>Loading</Typography>
    </Box>
  ));
};
