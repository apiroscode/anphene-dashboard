import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { useDebouncedCallback } from "use-debounce";

import { CircularProgress, TableBody, TableCell, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";
import { useQuery } from "@/utils/hooks";
import { DELAYED_TIMEOUT } from "@/config/constants";

import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";
import { ResponsiveTable } from "@/components/_table/ResponsiveTable";

import { GetSimpleCategories } from "../../categories/queries";
import { GetSimpleCollections } from "../../collections/queries";
import { GetProducts } from "../../products/queries";

export const ASSIGN_CATEGORIES = "assign-categories";
export const ASSIGN_COLLECTIONS = "assign-collections";
export const ASSIGN_PRODUCTS = "assign-products";

const getType = {
  category: {
    action: ASSIGN_CATEGORIES,
    query: GetSimpleCategories,
    queryField: "categories",
    appName: "Category",
    pluralAppName: "Categories",
    getName: (node) => `${"-".repeat(node?.level)}${node?.name}`,
  },
  collection: {
    action: ASSIGN_COLLECTIONS,
    query: GetSimpleCollections,
    queryField: "collections",
    appName: "Collection",
    pluralAppName: "Collections",
    getName: (node) => node.name,
  },
  product: {
    action: ASSIGN_PRODUCTS,
    query: GetProducts,
    queryField: "products",
    appName: "Product",
    pluralAppName: "Products",
    getName: (node) => node.name,
  },
};

const useStyles = makeStyles(
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
  { name: "AssignItem" }
);

const Base = (props) => {
  const { vars, loading, handleSingleClick, type } = props;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState(undefined);

  const { query, queryField, appName, pluralAppName, getName } = getType[type];

  const { data, fetchMore } = useQuery(query, {
    variables: {
      search: searchParam,
      first: 10,
      ...vars,
    },
    fetchPolicy: "network-only",
  });

  const available = maybe(() => data[queryField].edges, []);
  const hasMore = maybe(() => data[queryField].pageInfo.hasNextPage, false);

  const [searchDebounce] = useDebouncedCallback((value) => {
    setSearchParam(value ? value : undefined);
  }, DELAYED_TIMEOUT);

  const onFetchMore = () => {
    const endCursor = maybe(() => data[queryField].pageInfo.endCursor, false);

    fetchMore({
      variables: {
        search,
        ...vars,
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult[queryField].edges;
        const pageInfo = fetchMoreResult[queryField].pageInfo;
        return newEdges.length
          ? {
              [queryField]: {
                ...previousResult[queryField],
                pageInfo,
                edges: [...previousResult[queryField].edges, ...newEdges],
              },
            }
          : previousResult;
      },
    });
  };

  return (
    <>
      <TextField
        fullWidth
        placeholder={`Search ${appName}`}
        className={classes.search}
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          searchDebounce(value);
        }}
      />
      <div className={classes.rootContent}>
        <InfiniteScroll
          pageStart={0}
          loadMore={onFetchMore}
          hasMore={hasMore}
          useWindow={false}
          loader={
            <div key={0} className={classes.loadMoreLoaderContainer}>
              <CircularProgress size={16} />
            </div>
          }
          threshold={100}
          key="infinite-scroll"
        >
          <ResponsiveTable key="table">
            <TableBody>
              {available.length > 0 ? (
                available.map((item) => {
                  const node = item.node;

                  return (
                    <TableRow key={node.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          disabled={loading}
                          onClick={(e) => handleSingleClick(e, node.id)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{getName(node)}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>All {pluralAppName} assigned</TableCell>
                </TableRow>
              )}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </div>
    </>
  );
};

export const AssignItem = (props) => {
  const {
    params,
    title,
    onClose,
    vars = {},
    loading,
    onAssign,
    selected,
    handleSingleClick,
    type,
  } = props;

  return (
    <Dialog
      title={title}
      open={params.action === getType[type].action}
      handleOk={() => {
        onAssign(selected);
      }}
      handleClose={onClose}
      okText="Assign"
      okProps={{
        disabled: selected.length === 0 || loading,
      }}
    >
      <Base vars={vars} loading={loading} handleSingleClick={handleSingleClick} type={type} />
    </Dialog>
  );
};
