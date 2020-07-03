import React, { useEffect } from "react";

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

import { useQS } from "@/utils/hooks";

import { ErrorMessage } from "@/components/_form";
import { ResponsiveTable, SortableTableBody, SortableTableRow } from "@/components/_table";
import { Card } from "@/components/Card";

import { useAttributeValuesStyles } from "../../_form";
import { ValueAssign } from "./ValueAssign";
import { ValueUpdate } from "./ValueUpdate";
import { ValueDelete } from "./ValueDelete";

export const AttributeValues = (props) => {
  const { setValue, watch, register, unregister, errors } = props;
  const [params, setParams] = useQS({
    action: undefined,
    id: undefined,
  });

  const classes = useAttributeValuesStyles();
  const values = watch("values");

  useEffect(() => {
    register("values");
    return () => {
      unregister("values");
    };
  }, [register, unregister]);

  const move = ({ oldIndex, newIndex }) => {
    const newData = [...values];
    const element = newData[oldIndex];

    newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, element);
    setValue("values", newData);
  };

  const handleClose = () => setParams({ action: undefined, id: undefined });

  const baseProps = {
    values,
    setValue,
    params,
    handleClose,
  };

  return (
    <Card
      title="Attribute Values"
      action={
        <Button
          color="primary"
          onClick={() =>
            setParams({
              action: "assign-value",
            })
          }
        >
          Assign Value
        </Button>
      }
      useDense
    >
      <ErrorMessage errors={errors} name="values" useMarginTop={false} useMarginBottom={false} />
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
                key={`field-${index}`}
                index={index}
                className={classes.tableBodyRow}
                onClick={() => setParams({ action: "update-value", id: index })}
              >
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.value ? field.value : "-"}</TableCell>
                <TableCell padding="checkbox" align="center">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      setParams({ action: "delete-value", id: index });
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
      <ValueDelete {...baseProps} />
      <ValueUpdate {...baseProps} />
    </Card>
  );
};
