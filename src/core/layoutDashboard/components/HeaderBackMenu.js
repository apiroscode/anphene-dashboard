import React, { useEffect, useState } from "react";

import { useStoreState } from "easy-peasy";
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
  const results = backLink.filter((item) => matchPath(`${item.link}/:subUrl`, pathName));
  if (results.length > 0) {
    return results[0];
  }
  return { label: undefined, link: undefined };
};

export const HeaderBackMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const headerBackLabel = useStoreState((state) => state.app.headerBackLabel);

  const [backLink, setBackLink] = useState({
    label: undefined,
    link: undefined,
  });

  useEffect(() => {
    if (headerBackLabel) {
      setBackLink(headerBackLabel);
    } else {
      setBackLink(getBackLink(location.pathname));
    }
  }, [location, headerBackLabel]);

  if (backLink.label !== undefined) {
    return (
      <div className={classes.wrapper} onClick={() => navigate(backLink.link)}>
        <ArrowBack />
        <span>{backLink.label}</span>
      </div>
    );
  } else {
    return null;
  }
};
