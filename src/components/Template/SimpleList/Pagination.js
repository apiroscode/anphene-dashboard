import React from "react";

import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";

import { maybe } from "@/utils";

import { paginate } from "../utils";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(1, 2),
      "& > button:last-child": {
        marginLeft: theme.spacing(0.5),
      },
    },
  }),
  { name: "SimpleListPagination" }
);

export const Pagination = (props) => {
  const { data, queryField, loading, params, setParams } = props;
  const classes = useStyles();
  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data?.[queryField]?.pageInfo),
    params,
    setParams
  );

  return (
    <div className={classes.root}>
      <IconButton
        size="small"
        onClick={loadPreviousPage}
        disabled={pageInfo !== undefined ? loading || !pageInfo.hasPreviousPage : true}
      >
        <ArrowBackIosOutlined />
      </IconButton>
      <IconButton
        size="small"
        onClick={loadNextPage}
        disabled={pageInfo !== undefined ? loading || !pageInfo.hasNextPage : true}
      >
        <ArrowForwardIosOutlined />
      </IconButton>
    </div>
  );
};
