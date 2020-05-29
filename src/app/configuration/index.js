import React from "react";

import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { menuItems } from "./menuItems";

const useStyles = makeStyles(
  (theme) => ({
    container: {
      display: "grid",
      gridColumnGap: theme.spacing(4),
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing(3),
      borderTop: `1px solid ${theme.palette.divider}`,
      "& > *:first-child": {
        paddingBottom: theme.spacing(3),
      },
    },
    item: {
      display: "grid",
      gridColumnGap: theme.spacing(4),
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
      gridTemplateColumns: "1fr 1fr",
      "& > *": {
        marginBottom: theme.spacing(3),
      },
    },
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);",
      },
      cursor: "pointer",
      marginBottom: theme.spacing(3),
      transition: theme.transitions.duration.standard + "ms",
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 16,
      },
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "48px 1fr",
    },

    icon: {
      "& path": {
        fill: theme.palette.primary.main,
      },
      fontSize: 48,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600,
    },
  }),
  { name: "Configuration" }
);

export default () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useStoreState((state) => state.auth.user);
  const userPermissions = user.userPermissions.map((perm) => perm.code);

  return (
    <>
      <Typography variant="h5">Configuration</Typography>
      {menuItems.map((parent, parentIdx) => {
        const allChildrenPermission = parent.children.map((item) => item.permission);
        const checkPermissions = (permission) => {
          if (permission === undefined) {
            return true;
          }
          return userPermissions.includes(permission);
        };
        const gotPermissions = allChildrenPermission.some(checkPermissions);

        if (!gotPermissions) {
          return null;
        }
        return (
          <div className={classes.container} key={parentIdx}>
            <Typography variant="body1">{parent.description}</Typography>
            <div className={classes.item}>
              {parent.children.map((menu, menuIdx) => {
                return (
                  <Card key={menuIdx} className={classes.card} onClick={() => navigate(menu.url)}>
                    <CardContent className={classes.cardContent}>
                      <div className={classes.icon}>{menu.icon}</div>
                      <div>
                        <Typography className={classes.sectionTitle} color="primary">
                          {menu.label}
                        </Typography>
                        <Typography>{menu.description}</Typography>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
