import React, { useEffect, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";

import { backLink } from "../headerBackLink";

const useStyles = makeStyles(
  (theme) => ({
    wrapper: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.grey[500],
      transition: "color 0.5s ease",
      cursor: "pointer",
      fontSize: theme.spacing(2),
      "&:hover": {
        color: theme.palette.grey[600],
      },
      "& svg": {
        fontSize: theme.spacing(3.5),
        marginRight: theme.spacing(1),
      },
    },
  }),
  {
    name: "HeaderBackMenu",
  }
);

const getBackLink = (pathName) => {
  const results = backLink.filter((item) => matchPath(item.condition, pathName));
  if (results.length > 0) {
    const result = results[0];
    return result.backLink;
  }
  return { backLabel: undefined, backUrl: undefined };
};

export const HeaderBackMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [backLink, setBackLink] = useState({
    backLabel: undefined,
    backUrl: undefined,
  });

  useEffect(() => {
    setBackLink(getBackLink(location.pathname));
  }, [location]);

  if (backLink.backLabel !== undefined) {
    return (
      <div className={classes.wrapper} onClick={() => navigate(backLink.backUrl)}>
        <ArrowBack />
        <span>{backLink.backLabel}</span>
      </div>
    );
  } else {
    return null;
  }
};
