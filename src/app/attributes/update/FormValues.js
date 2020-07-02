import React from "react";

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

import { move } from "@/utils/lists";
import { useMutation, useQS } from "@/utils/hooks";

import { ResponsiveTable, SortableTableBody, SortableTableRow } from "@/components/_table";
import { Card } from "@/components/Card";

import { ReorderAttributeValue } from "../mutations";
import { useAttributeValuesStyles } from "../_form";
import { ValueDelete } from "./ValueDelete";
import { ValueUpdate } from "./ValueUpdate";
import { ValueAssign } from "./ValueAssign";

export const FormValues = (props) => {
  const { attribute } = props;
  const [reorder] = useMutation(ReorderAttributeValue);
  const classes = useAttributeValuesStyles();
  const [params, setParams] = useQS({
    action: undefined,
    id: undefined,
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const optimisticResponse = {
      attributeReorderValues: {
        __typename: "AttributeReorderValues",
        attribute: {
          ...attribute,
          values: move(
            attribute.values[oldIndex],
            attribute.values,
            (a, b) => a.id === b.id,
            newIndex
          ),
        },
        errors: [],
      },
    };

    const variables = {
      attributeId: attribute.id,
      moves: [
        {
          id: attribute.values[oldIndex].id,
          sortOrder: newIndex - oldIndex,
        },
      ],
    };

    reorder({ variables, optimisticResponse });
  };

  const handleClose = () => {
    setParams({
      action: undefined,
      id: undefined,
    });
  };

  const baseProps = {
    attributeId: attribute.id,
    attributeValues: attribute.values,
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
        {attribute.values.length > 0 ? (
          <SortableTableBody onSortEnd={onSortEnd}>
            {attribute.values.map((field, index) => (
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
