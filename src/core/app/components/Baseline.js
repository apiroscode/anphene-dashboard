import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";

const styles = createStyles({
  "@global": {
    "@import": "url('https://rsms.me/inter/inter.css')",
  },
});

export const Baseline = withStyles(styles, {
  name: "Baseline",
})(() => <CssBaseline />);
