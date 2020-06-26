import React, { useState } from "react";

import clsx from "clsx";

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

import { useMutation, usePermissions } from "@/utils/hooks";

import { ATTRIBUTE_UNASSIGN, REORDER_ATTRIBUTE } from "@/graphql/mutations/productTypes";

import { Checkbox } from "@/components/Checkbox";
import { ResponsiveTable, SortableTableBody, SortableTableRow } from "@/components/Table";

import { ACTION as UNASSIGN_ACTION, AttributesUnAssign } from "./AttributesUnAssign";
import { useNavigate } from "react-router-dom";
import { PermissionEnum } from "@/config/enum";
import { move } from "@/utils/lists";

const useStyles = makeStyles(
  (theme) => ({
    tableBodyRow: {
      cursor: "pointer",
    },
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

export const AttributesTable = (props) => {
  const [gotPermission] = usePermissions(PermissionEnum.MANAGE_ATTRIBUTES);
  const { params, handleClose, attributes, setParams, productType, type } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [reorder, { loading: reorderLoading }] = useMutation(REORDER_ATTRIBUTE);
  const [unAssign, { loading: unAssignLoading }] = useMutation(ATTRIBUTE_UNASSIGN);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const variables = {
      productTypeId: productType.id,
      type,
      moves: [
        {
          id: attributes[oldIndex].id,
          sortOrder: newIndex - oldIndex,
        },
      ],
    };

    const optimisticResponse = {
      productTypeReorderAttribute: {
        __typename: "ProductTypeReorderAttribute",
        errors: [],
        productType: {
          ...productType,
          productAttributes:
            type === "PRODUCT"
              ? move(
                  productType.productAttributes[oldIndex],
                  productType.productAttributes,
                  (a, b) => a.id === b.id,
                  newIndex
                )
              : productType.productAttributes,
          variantAttributes:
            type === "VARIANT"
              ? move(
                  productType.variantAttributes[oldIndex],
                  productType.variantAttributes,
                  (a, b) => a.id === b.id,
                  newIndex
                )
              : productType.variantAttributes,
        },
      },
    };

    reorder({ variables, optimisticResponse });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const dataCount = attributes.length;
  const numSelected = selected.length;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = attributes.map((field) => field.id);
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

  const handleNavigate = (attributeId) => {
    if (gotPermission) {
      navigate(`/configuration/attributes/${attributeId}`);
    }
  };
  const unAssignProps = {
    params,
    handleClose,
    attributes,
    type,
    setSelected,
    loading: unAssignLoading,
    unAssign,
    productTypeId: productType.id,
    productTypeName: productType.name,
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
                    setParams({ action: UNASSIGN_ACTION, ids: selected, type });
                  }}
                >
                  UNASSIGN
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        {attributes.length > 0 ? (
          <SortableTableBody onSortEnd={onSortEnd}>
            {attributes.map((field, index) => {
              const isItemSelected = isSelected(field.id);
              return (
                <SortableTableRow
                  hover
                  key={field.id}
                  className={classes.tableBodyRow}
                  index={index}
                  onClick={() => handleNavigate(field.id)}
                >
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
                        setParams({ action: UNASSIGN_ACTION, ids: [field.id], type });
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
      <AttributesUnAssign {...unAssignProps} />
    </>
  );
};
