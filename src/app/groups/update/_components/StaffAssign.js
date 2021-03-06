import React from "react";

import { useSnackbar } from "notistack";
import InfiniteScroll from "react-infinite-scroller";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { CircularProgress, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";
import { useSelected } from "@/utils/hooks";

import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";
import { ResponsiveTable } from "@/components/_table";

import { GetAvailableStaff } from "../../queries";
import { AssignStaff } from "../../mutations";

const useStyles = makeStyles(
  (theme) => ({
    rootContent: {
      overflow: "auto",
      padding: 0,
      height: 360,
    },
    loadMoreLoaderContainer: {
      alignItems: "center",
      display: "flex",
      height: theme.spacing(3),
      justifyContent: "center",
    },
  }),
  { name: "AssignAttribute" }
);

const DialogContent = (props) => {
  const { group, handleSingleClick, loading } = props;
  const classes = useStyles();
  const queryVariables = { id: group.id };
  const { data, fetchMore } = useQuery(GetAvailableStaff, {
    variables: queryVariables,
    fetchPolicy: "network-only",
  });

  const availableStaff = maybe(() => data.group.availableStaff.edges, []);
  const hasMore = maybe(() => data.group.availableStaff.pageInfo.hasNextPage, false);

  const onFetchMore = () => {
    const endCursor = maybe(() => data.group.availableStaff.pageInfo.endCursor, false);
    fetchMore({
      variables: {
        ...queryVariables,
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.group.availableStaff.edges;
        const pageInfo = fetchMoreResult.group.availableStaff.pageInfo;
        return newEdges.length
          ? {
              group: {
                ...previousResult.group,
                availableStaff: {
                  __typename: previousResult.group.availableStaff.__typename,
                  edges: [...previousResult.group.availableStaff.edges, ...newEdges],
                  pageInfo,
                },
              },
            }
          : previousResult;
      },
    });
  };

  return (
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
          {availableStaff.length > 0 ? (
            availableStaff.map((item) => {
              return (
                <TableRow key={item.node.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      disabled={loading}
                      onClick={(e) => handleSingleClick(e, item.node.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.node.name}</TableCell>
                  <TableCell>{item.node.email}</TableCell>
                  <TableCell>{item.node.isActive ? "Active" : "Disabled"}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>All staff assigned</TableCell>
            </TableRow>
          )}
        </TableBody>
      </ResponsiveTable>
    </InfiniteScroll>
  );
};

export const ACTION = "assign-staff";
export const StaffAssign = (props) => {
  const { group, params, handleClose } = props;
  const { action } = params;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [assign, { loading }] = useMutation(AssignStaff);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const handleAssign = async () => {
    const variables = {
      groupId: group.id,
      staffIds: selected,
    };

    const result = await assign({ variables });
    if (result === undefined) return;

    const {
      data: {
        groupStaffAssign: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      setSelected([]);
      handleClose();
    }
  };

  return (
    <Dialog
      open={action === ACTION}
      title="Assign Staff"
      handleOk={handleAssign}
      handleClose={handleClose}
      okText="ASSIGN STAFF"
      okProps={{
        disabled: selected.length === 0 || loading,
      }}
      contentClass={classes.rootContent}
    >
      <DialogContent
        loading={loading}
        selected={selected}
        handleSingleClick={handleSingleClick}
        {...props}
      />
    </Dialog>
  );
};
