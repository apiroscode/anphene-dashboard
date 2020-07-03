import React from "react";

import { useSnackbar } from "notistack";
import InfiniteScroll from "react-infinite-scroller";

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Box,
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";
import { useSelected } from "@/utils/hooks";

import { ResponsiveTable } from "@/components/_table";
import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";

import { GetAvailableAttributes } from "../../queries";
import { AssignAttribute } from "../../mutations";

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
  const { productType, type, handleSingleClick, loading } = props;
  const classes = useStyles();
  const queryVariables = { id: productType.id, inputType: type };
  const { data, fetchMore } = useQuery(GetAvailableAttributes, {
    variables: queryVariables,
    fetchPolicy: "network-only",
  });

  const availableAttributes = maybe(() => data.productType.availableAttributes.edges, []);
  const hasMore = maybe(() => data.productType.availableAttributes.pageInfo.hasNextPage, false);

  const onFetchMore = () => {
    const endCursor = maybe(() => data.productType.availableAttributes.pageInfo.endCursor, false);

    fetchMore({
      variables: {
        ...queryVariables,
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.productType.availableAttributes.edges;
        const pageInfo = fetchMoreResult.productType.availableAttributes.pageInfo;
        return newEdges.length
          ? {
              productType: {
                ...previousResult.productType,
                availableAttributes: {
                  __typename: previousResult.productType.availableAttributes.__typename,
                  edges: [...previousResult.productType.availableAttributes.edges, ...newEdges],
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
          {availableAttributes.length > 0 ? (
            availableAttributes.map((item) => {
              return (
                <TableRow key={item.node.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      disabled={loading}
                      onClick={(e) => handleSingleClick(e, item.node.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography>{item.node.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.node.slug}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>All attributes assigned</TableCell>
            </TableRow>
          )}
        </TableBody>
      </ResponsiveTable>
    </InfiniteScroll>
  );
};

export const ACTION = "assign-attributes";
export const AttributesAssign = (props) => {
  const {
    productType,
    type,
    params: { action, type: typeParams },
    handleClose,
  } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [assign, { loading }] = useMutation(AssignAttribute);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const handleAssign = async () => {
    const variables = {
      productTypeId: productType.id,
      operations: selected.map((item) => ({
        id: item,
        type: type === "VARIANT" ? "VARIANT" : "PRODUCT",
      })),
    };

    const result = await assign({ variables });
    if (result === undefined) return;

    const {
      data: {
        attributeAssign: { errors },
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
      open={action === ACTION && type === typeParams}
      title="Assign Attribute"
      handleOk={handleAssign}
      handleClose={handleClose}
      okText="ASSIGN ATTRIBUTES"
      okProps={{
        disabled: selected.length === 0 || loading,
      }}
      contentClass={classes.rootContent}
    >
      <DialogContent loading={loading} handleSingleClick={handleSingleClick} {...props} />
    </Dialog>
  );
};
