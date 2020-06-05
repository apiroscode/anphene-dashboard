import React, { useEffect, useState } from "react";

import { TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";

import { ErrorMessage } from "@/components/form";
import { ResponsiveTable, SortableTableBody, SortableTableRow } from "@/components/Table";
import { Card } from "@/components/Template";

import { useAttributeValuesStyles } from "../components";
import { ValueAssign } from "./ValueAssign";
import { ValueUpdate } from "./ValueUpdate";
import { ValueDelete } from "./ValueDelete";

export const FormValues = (props) => {
  const { setValue, watch, register, unregister, errors } = props;
  const classes = useAttributeValuesStyles();
  const [edit, setEdit] = useState({
    open: false,
    index: null,
    data: {},
  });
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

  const openEditDialog = (data, index) => {
    setEdit({
      open: true,
      index,
      data,
    });
  };

  return (
    <Card
      title="Attribute Values"
      action={<ValueAssign setValue={setValue} values={values} />}
      densePadding
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
                onClick={() => {
                  openEditDialog(field, index);
                }}
              >
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.value ? field.value : "-"}</TableCell>
                <TableCell padding="checkbox" align="center">
                  <ValueDelete name={field.name} idx={index} values={values} setValue={setValue} />
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
      <ValueUpdate edit={edit} setEdit={setEdit} values={values} setValue={setValue} />
    </Card>
  );
};
