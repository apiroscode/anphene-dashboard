import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

import people from "./people.png";

const useStyles = makeStyles(
  (theme) => ({
    background: {
      background: `
      radial-gradient(
        circle,
        transparent 20%,
        slategray 20%,
        slategray 80%,
        transparent 80%,
        transparent
      ),
      radial-gradient(
          circle,
          transparent 20%,
          slategray 20%,
          slategray 80%,
          transparent 80%,
          transparent
        )
        50px 50px,
      linear-gradient(#a8b1bb 8px, transparent 8px) 0 -4px,
      linear-gradient(90deg, #a8b1bb 8px, transparent 8px) -4px 0
    `,
      backgroundColor: "slategray",
      backgroundSize: "100px 100px, 100px 100px, 50px 50px, 50px 50px",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    main: {
      opacity: "85%",
    },
  }),
  { name: "ErrorApp" }
);

export const Error = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className={classes.background}
    >
      <Box width="30%">
        <img src={people} alt="working team" className={classes.image} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={4}
        p={4}
        bgcolor="grey.400"
        className={classes.main}
      >
        <Typography variant="h4" paragraph>
          Sorry, something went wrong please refresh this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Refresh />}
          onClick={() => window.location.reload()}
        >
          REFRESH
        </Button>
      </Box>
    </Box>
  );
};
