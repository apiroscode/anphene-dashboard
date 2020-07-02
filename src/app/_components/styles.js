import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  (theme) => ({
    rootContent: {
      overflow: "auto",
      padding: 0,
      height: 360,
    },
    search: {
      marginBottom: theme.spacing(2),
      "& input": {
        padding: "10.5px 12px",
        "&::placeholder": {
          transition: ".2s ease",
          color: "transparent",
        },
        "&:focus::placeholder": {
          color: "inherit",
        },
      },
    },
    loadMoreLoaderContainer: {
      alignItems: "center",
      display: "flex",
      height: theme.spacing(3),
      justifyContent: "center",
    },
  }),
  { name: "AssignStyles" }
);
