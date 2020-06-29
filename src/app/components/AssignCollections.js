import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { useDebouncedCallback } from "use-debounce";

import { CircularProgress, TableBody, TableCell, TableRow, TextField } from "@material-ui/core";

import { DELAYED_TIMEOUT } from "@/config/constants";

import { maybe } from "@/utils";
import { useQuery } from "@/utils/hooks";

import { GET_SIMPLE_COLLECTIONS } from "@/graphql/queries/collections";

import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";
import { ResponsiveTable } from "@/components/Table";

import { useStyles } from "./styles";

const Base = (props) => {
  const { vars, loading, handleSingleClick } = props;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState(undefined);

  const { data, fetchMore } = useQuery(GET_SIMPLE_COLLECTIONS, {
    variables: {
      search: searchParam,
      sortDirection: "ASC",
      sortField: "NAME",
      first: 10,
      ...vars,
    },
    fetchPolicy: "network-only",
  });

  const availableCollections = maybe(() => data.collections.edges, []);
  const hasMore = maybe(() => data.collections.pageInfo.hasNextPage, false);

  const [searchDebounce] = useDebouncedCallback((value) => {
    setSearchParam(value ? value : undefined);
  }, DELAYED_TIMEOUT);

  const onFetchMore = () => {
    const endCursor = maybe(() => data.collections.pageInfo.endCursor, false);

    fetchMore({
      variables: {
        search,
        ...vars,
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.collections.edges;
        const pageInfo = fetchMoreResult.collections.pageInfo;
        return newEdges.length
          ? {
              collections: {
                ...previousResult.collections,
                pageInfo,
                edges: [...previousResult.collections.edges, ...newEdges],
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
        placeholder="Search Collection"
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
              {availableCollections.length > 0 ? (
                availableCollections.map((item) => {
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
                      <TableCell>{node.name}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>All collections assigned</TableCell>
                </TableRow>
              )}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </div>
    </>
  );
};

export const ACTION = "assign-collections";
export const AssignCollections = (props) => {
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
