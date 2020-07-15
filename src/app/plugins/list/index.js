import React from "react";

import clsx from "clsx";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";

import { capitalize, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { QueryWrapper } from "@/components/QueryWrapper";

import { _plugins } from "../_plugins";

import { GetPlugins } from "../queries";

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
      maxWidth: 48,
      maxHeight: 48,
    },
    header: {
      display: "flex",
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600,
      marginRight: theme.spacing(1),
    },
    chip: {
      padding: theme.spacing(0.25, 0.5),
      letterSpacing: 1,
      textTransform: "uppercase",
      border: "1px solid",
      fontSize: theme.spacing(1.5),
      borderColor: theme.palette.success.main,
      color: theme.palette.success.main,
    },
    chipActive: {
      borderColor: theme.palette.success.dark,
      color: theme.palette.success.dark,
    },
    chipDisable: {
      borderColor: theme.palette.error.dark,
      color: theme.palette.error.dark,
    },
  }),
  { name: "Plugins" }
);

const Base = (props) => {
  const { plugins } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const groupPlugins = plugins.reduce((r, obj) => {
    r[obj.node.type] = (r[obj.node.type] || []).concat(obj);
    return r;
  }, {});

  return (
    <>
      <Typography variant="h5">Plugins</Typography>
      {Object.keys(groupPlugins).map((type) => (
        <div className={classes.container} key={type}>
          <Typography variant="body1">{capitalize(type)}</Typography>
          <div className={classes.item}>
            {groupPlugins[type].map(({ node }) => {
              return (
                <Card key={node.id} className={classes.card} onClick={() => navigate(node.id)}>
                  <CardContent className={classes.cardContent}>
                    <SVG src={_plugins[node.id].logo} className={classes.icon} />
                    <div>
                      <div className={classes.header}>
                        <Typography className={classes.sectionTitle} color="primary">
                          {node.name}
                        </Typography>
                        <Typography
                          className={clsx({
                            [classes.chip]: true,
                            [classes.chipActive]: node.active,
                            [classes.chipDisable]: !node.active,
                          })}
                        >
                          {node.active ? "ACTIVE" : "DISABLE"}
                        </Typography>
                      </div>
                      <Typography>{node.description}</Typography>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default () => (
  <QueryWrapper query={GetPlugins} fieldName="plugins">
    {(data) => <Base plugins={data.plugins.edges} />}
  </QueryWrapper>
);
