import React from "react";

import { IconButton, MenuItem, Select, Typography } from "@material-ui/core";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";

import { paginate } from "./utils";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    pageSize: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      "& > button:last-child": {
        marginLeft: theme.spacing(1),
      },
    },
    select: {
      marginLeft: theme.spacing(1),
      "&:after, &:before, &:hover": {
        border: "none !important",
      },
      color: theme.palette.primary.main,
      "& svg": {
        color: theme.palette.primary.main,
      },
    },
  }),
  { name: "TemplateListPagination" }
);

export const Pagination = (props) => {
  const { params, setParams, data, queryField, loading } = props;
  const classes = useStyles();

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data?.[queryField]?.pageInfo),
    params,
    setParams
  );

  const changePageSize = (e) => {
    const pageSize = e.target.value;
    setParams({
      ...params,
      pageSize,
      after: undefined,
      before: undefined,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.pageSize}>
        <Typography as="span" variant="body2" color="textSecondary">
          Rows per page:
        </Typography>
        <Select
          className={classes.select}
          value={params.pageSize}
          onChange={changePageSize}
          disabled={loading}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>
      <div className={classes.button}>
        <IconButton
          onClick={loadPreviousPage}
          disabled={pageInfo !== undefined ? loading || !pageInfo.hasPreviousPage : true}
        >
          <ArrowBackIosOutlined />
        </IconButton>
        <IconButton
          onClick={loadNextPage}
          disabled={pageInfo !== undefined ? loading || !pageInfo.hasNextPage : true}
        >
          <ArrowForwardIosOutlined />
        </IconButton>
      </div>
    </div>
  );
};
