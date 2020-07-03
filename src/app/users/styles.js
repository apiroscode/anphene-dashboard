import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  (theme) => ({
    card: {
      paddingTop: theme.spacing(4),
      width: theme.spacing(45),
      position: "relative",
      overflow: "visible",
    },
    iconHeader: {
      color: "#fff",
      width: theme.spacing(8),
      height: theme.spacing(8),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      position: "absolute",
      top: -32,
      left: 24,
    },
    forgotGrid: {
      alignSelf: "flex-end",
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
  }),
  { name: "UserApp" }
);
