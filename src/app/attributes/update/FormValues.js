import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

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

  const [updateValue, setUpdateValue] = useState({
    open: false,
    value: {},
  });

  const [deleteValue, setDeleteValue] = useState({
    open: false,
    valueId: null,
    name: "",
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
      valueId: element.id,
      sortOrder,
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

  const openEditDialog = (data) => {
    setUpdateValue({
      open: true,
      value: data,
    });
  };

  const openDeleteDialog = (data) => {
    setDeleteValue({
      open: true,
      valueId: data.id,
      name: data.name,
    });
  };

  return (
    <Card title="Attribute Values" action={<ValueAssign attributeId={attributeId} />} densePadding>
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
                  openEditDialog(field);
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
                      openDeleteDialog(field);
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
      <ValueUpdate updateValue={updateValue} setUpdateValue={setUpdateValue} />
      <ValueDelete deleteValue={deleteValue} setDeleteValue={setDeleteValue} />
    </Card>
  );
};
