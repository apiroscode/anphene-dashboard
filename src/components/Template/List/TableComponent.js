import React from "react";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Checkbox } from "@/components/Checkbox";
import { ResponsiveTable } from "@/components/Table";

import { TableBulkMutation } from "./TableBulkMutation";

const useStyles = makeStyles(
  (theme) => ({
    tableBodyRow: {
      cursor: "pointer",
    },
    selectedRoot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: theme.spacing(3),
    },
    selectedButton: {
      display: "flex",
      alignItems: "center",
      "& button": {
        marginRight: theme.spacing(1),
      },
      "& button:last-of-child": {
        marginRight: 0,
      },
    },
  }),
  { name: "TemplateListTable" }
);

export const TableComponent = (props) => {
  const {
    selected,
    setSelected,
    params,
    sortHandler,
    data,
    isSelected,
    numSelected,
    bulkMutations,
    dataCount,
    handleAllClick,
    loading,
    table,
    handleSingleClick,
    action,
    notFoundName,
  } = props;

  const classes = useStyles();

  return (
    <TableContainer>
      <ResponsiveTable>
        <TableHead>
          <TableRow selected={numSelected > 0}>
            {bulkMutations.length > 0 && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < dataCount}
                  checked={dataCount > 0 && numSelected === dataCount}
                  onChange={handleAllClick}
                  disabled={loading}
                  size="small"
                />
              </TableCell>
            )}
            {numSelected > 0 ? (
              <TableCell colSpan={table.column.length} align="left" padding="none">
                <div className={classes.selectedRoot}>
                  <Typography
                    className={classes.rowToolbarTitle}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                  >
                    Selected {numSelected} items
                  </Typography>
                  <div className={classes.selectedButton}>
                    {bulkMutations.map((item, idx) => (
                      <TableBulkMutation
                        key={idx}
                        selected={selected}
                        setSelected={setSelected}
                        item={item}
                        {...props}
                      />
                    ))}
                  </div>
                </div>
              </TableCell>
            ) : (
              table.column.map((cell, idx) => (
                <TableCell
                  key={cell.field}
                  align={cell.align}
                  padding={idx === 0 && bulkMutations.length > 0 ? "none" : "default"}
                  sortDirection={
                    table.defaultSort
                      ? params.sortField === cell.sortField
                        ? params.sortDirection.toLowerCase()
                        : false
                      : false
                  }
                  width={cell.width ? cell.width : "auto"}
                >
                  {cell.sortField ? (
                    <TableSortLabel
                      active={params.sortField === cell.sortField}
                      direction={
                        params.sortField === cell.sortField
                          ? params.sortDirection.toLowerCase()
                          : "asc"
                      }
                      onClick={() => sortHandler(cell.sortField)}
                    >
                      {cell.label}
                    </TableSortLabel>
                  ) : (
                    cell.label
                  )}
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => {
              const node = item.node;
              const isItemSelected = isSelected(node.id);
              return (
                <TableRow
                  hover
                  key={node.id}
                  className={classes.tableBodyRow}
                  selected={isItemSelected}
                  onClick={() => (action ? action(node) : null)}
                >
                  {bulkMutations.length > 0 && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(e) => handleSingleClick(e, node.id)}
                        disabled={loading}
                        size="small"
                      />
                    </TableCell>
                  )}
                  {table.column.map((cell, idx) => {
                    const cellField = cell.field.split(".").reduce((o, i) => o[i], node);
                    return (
                      <TableCell
                        key={cell.field}
                        align={cell.align}
                        padding={idx === 0 && bulkMutations.length > 0 ? "none" : "default"}
                        width={cell.width ? cell.width : "auto"}
                      >
                        {cell.render ? cell.render(cellField, item.node) : cellField}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                align="center"
                colSpan={bulkMutations.length > 0 ? table.column.length + 1 : table.column.length}
              >
                <Typography variant="subtitle1" color="textSecondary">
                  No {notFoundName.toLowerCase()} found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ResponsiveTable>
    </TableContainer>
  );
};
