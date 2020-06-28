import React from "react";

import clsx from "clsx";
import { useNavigate } from "react-router";

import { Card } from "@/components/Template";
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

import { useMutation, useQS, useSelected } from "@/utils/hooks";

import { BULK_DELETE_VARIANT } from "@/graphql/mutations/productVariants";

import { Checkbox } from "@/components/Checkbox";
import { ResponsiveTable } from "@/components/Table";

import { ACTION, BulkDeleteVariants } from "./components/BulkDeleteVariants";

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
  { name: "ProductVariants" }
);

export const Variants = ({ product }) => {
  const { id: productId, variants } = product;
  const [params, setParams] = useQS({
    action: undefined,
    ids: undefined,
  });

  const navigate = useNavigate();
  const classes = useStyles();
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_VARIANT);

  const {
    selected,
    setSelected,
    isSelected,
    numSelected,
    handleAllClick,
    handleSingleClick,
  } = useSelected(variants);
  const dataCount = variants.length;
  const handleClose = () => {
    setParams({
      action: undefined,
      ids: undefined,
    });
  };

  const bulkDeleteProps = {
    productId,
    params,
    handleClose,
    variants,
    loading,
    setSelected,
    bulkDelete,
  };

  return (
    <Card
      title="Variants"
      useDense
      action={
        <Button color="primary" onClick={() => navigate("variants/create")}>
          CREATE VARIANT
        </Button>
      }
    >
      <ResponsiveTable>
        <TableHead>
          <TableRow
            className={clsx({
              [classes.rowSelectedHighlight]: numSelected > 0,
            })}
          >
            <TableCell padding="checkbox" align="center">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < dataCount}
                checked={dataCount > 0 && numSelected === dataCount}
                onChange={handleAllClick}
                disabled={loading}
                size="small"
              />
            </TableCell>
            {numSelected > 0 ? (
              <TableCell colSpan={4}>Selected {numSelected} items</TableCell>
            ) : (
              <>
                <TableCell>Variant</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </>
            )}
            <TableCell align="center" className={classes.action}>
              {numSelected > 0 && (
                <IconButton
                  onClick={(e) => {
                    setParams({ action: ACTION, ids: selected });
                  }}
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        {variants.length > 0 ? (
          <TableBody>
            {variants.map((field, index) => {
              const isItemSelected = isSelected(field.id);
              return (
                <TableRow
                  hover
                  key={field.id}
                  className={classes.tableBodyRow}
                  index={index}
                  onClick={() => navigate(`variants/${field.id}`)}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(e) => handleSingleClick(e, field.id)}
                      disabled={loading}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.sku}</TableCell>
                  <TableCell align="right">Rp {field.price.toLocaleString()}</TableCell>
                  <TableCell align="right">{field.quantity.toLocaleString()}</TableCell>
                  <TableCell align="center" className={classes.action}>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        setParams({ action: ACTION, ids: [field.id] });
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="subtitle1" color="textSecondary">
                  No variants found
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </ResponsiveTable>
      <BulkDeleteVariants {...bulkDeleteProps} />
    </Card>
  );
};
