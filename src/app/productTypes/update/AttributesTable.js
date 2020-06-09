import React, { useEffect, useState } from "react";

import clsx from "clsx";
import { useSnackbar } from "notistack";

import {
  Button,
  fade,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { ATTRIBUTE_UNASSIGN, REORDER_ATTRIBUTE } from "@/graphql/mutations/productTypes";

import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";
import { ResponsiveTable, SortableTableBody, SortableTableRow } from "@/components/Table";

const useStyles = makeStyles(
  (theme) => ({
    rowSelectedHighlight: {
      color: theme.palette.secondary.main,
      backgroundColor: fade(theme.palette.primary.main, 0.05),
    },
    action: {
      width: theme.spacing(12),
    },
  }),
  { name: "Attributes" }
);

const UnAssignDialog = (props) => {
  const {
    open,
    setOpen,
    loading,
    selected,
    setSelected,
    unAssign,
    productTypeId,
    productTypeName,
    singleData,
    setSingleData,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const handleUnAssign = async () => {
    let unAssignId;
    if (singleData) {
      unAssignId = [singleData.id];
    } else {
      unAssignId = selected;
    }

    const result = await unAssign({ variables: { productTypeId, attributeIds: unAssignId } });
    if (result === undefined) return;

    const {
      data: {
        attributeUnassign: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`${unAssignId.length} attributes unassign.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelected([]);
    setOpen(false);
    setSingleData(undefined);
  };

  return (
    <Dialog
      open={open}
      handleOk={handleUnAssign}
      handleClose={handleClose}
      title="Unassign Attribute From Product Type"
      okText="UNASSIGN"
      okProps={{
        loading: loading,
      }}
      cancelProps={{
        disabled: loading,
      }}
      content={
        <>
          Are you sure you want to unassign{" "}
          {singleData ? <strong>{singleData.name}</strong> : "these attributes"} from{" "}
          <strong>{productTypeName}</strong>?
        </>
      }
    />
  );
};

export const AttributesTable = (props) => {
  const { items, productType, type } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [values, setValues] = useState(items);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [singleData, setSingleData] = useState(undefined);
  const [reorder, { loading: reorderLoading }] = useMutation(REORDER_ATTRIBUTE);
  const [unAssign, { loading: unAssignLoading }] = useMutation(ATTRIBUTE_UNASSIGN);

  useEffect(() => {
    setValues(items);
  }, [items]);

  const move = async ({ oldIndex, newIndex }) => {
    const rawData = [...values];
    const newData = [...values];
    const element = newData[oldIndex];

    newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, element);
    setValues(newData);

    const sortOrder = newIndex - oldIndex;
    const variables = {
      productTypeId: productType.id,
      type,
      moves: [
        {
          id: element.id,
          sortOrder,
        },
      ],
    };

    const result = await reorder({ variables });
    if (result === undefined) return;

    const {
      data: {
        productTypeReorderAttribute: { errors },
      },
    } = result;

    if (errors.length > 1) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
      setValues(rawData);
    }
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const dataCount = values.length;
  const numSelected = selected.length;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = values.map((field) => field.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickCheckBox = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const unAssignProps = {
    open,
    setOpen,
    loading: unAssignLoading,
    selected,
    setSelected,
    unAssign,
    productTypeId: productType.id,
    productTypeName: productType.name,
    singleData,
    setSingleData,
  };

  const handleSingleClick = (id, name) => {
    setSingleData({
      id,
      name,
    });
    setOpen(true);
  };
  return (
    <>
      <ResponsiveTable>
        <TableHead>
          <TableRow
            className={clsx({
              [classes.rowSelectedHighlight]: numSelected > 0,
            })}
          >
            <TableCell padding="checkbox" align="center" />
            <TableCell padding="checkbox" align="center">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < dataCount}
                checked={dataCount > 0 && numSelected === dataCount}
                onChange={handleSelectAllClick}
                disabled={reorderLoading || unAssignLoading}
                size="small"
              />
            </TableCell>
            {numSelected > 0 ? (
              <TableCell colSpan={2}>Selected {numSelected} items</TableCell>
            ) : (
              <>
                <TableCell>Attribute Name</TableCell>
                <TableCell>Slug</TableCell>
              </>
            )}
            <TableCell align="center" className={classes.action}>
              {numSelected > 0 && (
                <Button
                  color="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  UNASSIGN
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        {values.length > 0 ? (
          <SortableTableBody onSortEnd={move}>
            {values.map((field, index) => {
              const isItemSelected = isSelected(field.id);
              return (
                <SortableTableRow hover key={field.id} index={index}>
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(e) => handleClickCheckBox(e, field.id)}
                      disabled={reorderLoading || unAssignLoading}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.slug}</TableCell>
                  <TableCell align="center" className={classes.action}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleSingleClick(field.id, field.name);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </SortableTableRow>
              );
            })}
          </SortableTableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="subtitle1" color="textSecondary">
                  No attributes assigned
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </ResponsiveTable>
      <UnAssignDialog {...unAssignProps} />
    </>
  );
};
