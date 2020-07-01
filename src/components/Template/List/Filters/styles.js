import { makeStyles } from "@material-ui/core/styles";

export const rangeStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      "&>*:first-child": {
        marginBottom: theme.spacing(1),
      },
    },
    wrapper: {
      display: "flex",
      alignItems: "center",
      "&>:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },
    input: {
      padding: "10px 12px 10px 12px",
    },
  }),
  { name: "FilterRangeStyle" }
);
