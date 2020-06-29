import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { useDebouncedCallback } from "use-debounce";

import { CircularProgress, TableBody, TableCell, TableRow, TextField } from "@material-ui/core";

import { DELAYED_TIMEOUT } from "@/config/constants";

import { maybe } from "@/utils";
import { useQuery } from "@/utils/hooks";

import { GET_SIMPLE_CATEGORIES } from "@/graphql/queries/categories";

import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";
import { ResponsiveTable } from "@/components/Table";

import { useStyles } from "./styles";

const Base = (props) => {
  const { vars, loading, handleSingleClick } = props;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState(undefined);

  const { data, fetchMore } = useQuery(GET_SIMPLE_CATEGORIES, {
    variables: {
      search: searchParam,
      first: 10,
      ...vars,
    },
    fetchPolicy: "network-only",
  });

  const availableCategories = maybe(() => data.categories.edges, []);
  const hasMore = maybe(() => data.categories.pageInfo.hasNextPage, false);

  const [searchDebounce] = useDebouncedCallback((value) => {
    setSearchParam(value ? value : undefined);
  }, DELAYED_TIMEOUT);

  const onFetchMore = () => {
    const endCursor = maybe(() => data.categories.pageInfo.endCursor, false);

    fetchMore({
      variables: {
        search,
        ...vars,
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.categories.edges;
        const pageInfo = fetchMoreResult.categories.pageInfo;
        return newEdges.length
          ? {
              categories: {
                ...previousResult.categories,
                pageInfo,
                edges: [...previousResult.categories.edges, ...newEdges],
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
        placeholder="Search Category"
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
              {availableCategories.length > 0 ? (
                availableCategories.map((item) => {
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
                      <TableCell>{`${"-".repeat(node?.level)}${node?.name}`}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>All categories assigned</TableCell>
                </TableRow>
              )}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </div>
    </>
  );
};

export const ACTION = "assign-categories";
export const AssignCategories = (props) => {
  const {
    params,
    title,
    onClose,
    vars = {},
    loading,
    onAssign,
    selected,
    handleSingleClick,
  } = props;

  return (
    <Dialog
      title={title}
      open={params.action === ACTION}
      handleOk={() => {
        onAssign(selected);
      }}
      handleClose={onClose}
      okText="Assign"
      okProps={{
        disabled: selected.length === 0 || loading,
      }}
    >
      <Base vars={vars} loading={loading} handleSingleClick={handleSingleClick} />
    </Dialog>
  );
};
