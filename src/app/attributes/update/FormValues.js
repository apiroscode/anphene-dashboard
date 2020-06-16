import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation, useQS } from "@/utils/hooks";

import { REORDER_ATTRIBUTE_VALUES } from "@/graphql/mutations/attributes";

import { ResponsiveTable, SortableTableBody, SortableTableRow } from "@/components/Table";
import { Card } from "@/components/Template";

import { useAttributeValuesStyles } from "../components";
import { ValueDelete } from "./ValueDelete";
import { ValueUpdate } from "./ValueUpdate";
import { ValueAssign } from "./ValueAssign";

export const FormValues = (props) => {
  const { attributeId, attributeValues } = props;
  const [reorder] = useMutation(REORDER_ATTRIBUTE_VALUES);
  const classes = useAttributeValuesStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState([]);
  const [params, setParams] = useQS({
    action: undefined,
    id: undefined,
  });

  useEffect(() => setValues(attributeValues), [attributeValues]);

  const move = async ({ oldIndex, newIndex }) => {
    const oldValues = [...values];
    const newValues = [...values];
    const element = newValues[oldIndex];

    newValues.splice(oldIndex, 1);
    newValues.splice(newIndex, 0, element);
    setValues(newValues);

    const sortOrder = newIndex - oldIndex;
    const variables = {
      attributeId,
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
        attributeReorderValues: { errors },
      },
    } = result;
    if (errors.length > 1) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
      setValues(oldValues);
    }
  };

  const handleClose = () => {
    setParams({
      action: undefined,
      id: undefined,
    });
  };

  const baseProps = {
    attributeId,
    attributeValues,
    params,
    handleClose,
  };

  return (
    <Card
      title="Attribute Values"
      action={
        <Button color="primary" onClick={() => setParams({ action: "assign-value" })}>
          Assign Value
        </Button>
      }
      useDense
    >
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" align="center" />
            <TableCell>Default Store View</TableCell>
            <TableCell>Additional Info</TableCell>
            <TableCell padding="checkbox" align="center" />
          </TableRow>
        </TableHead>
        {values.length > 0 ? (
          <SortableTableBody onSortEnd={move}>
            {values.map((field, index) => (
              <SortableTableRow
                hover
                key={field.id}
                index={index}
                className={classes.tableBodyRow}
                onClick={() => {
                  setParams({
                    action: "update-value",
                    id: field.id,
                  });
                }}
              >
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.value ? field.value : "-"}</TableCell>
                <TableCell padding="checkbox" align="center">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      setParams({
                        action: "delete-value",
                        id: field.id,
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </SortableTableRow>
            ))}
          </SortableTableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <Typography variant="subtitle1" color="textSecondary">
                  No values found
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </ResponsiveTable>
      <ValueAssign {...baseProps} />
      <ValueUpdate {...baseProps} />
      <ValueDelete {...baseProps} />
    </Card>
  );
};
