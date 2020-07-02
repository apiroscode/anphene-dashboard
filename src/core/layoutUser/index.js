import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Loading } from "./components/Loading";
import background from "./components/background.svg";

const useStyles = makeStyles(
  () => ({
    background: {
      backgroundImage: `url(${background})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 110px",
      backgroundSize: "100%",
    },
  }),
  { name: "LayoutUser" }
);

export default () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className={classes.background}
    >
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};
