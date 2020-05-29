import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

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

export const Table = (props) => {
  const { table, bulkMutations = [], data, params, setParams, pluralAppName, loading } = props;
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const dataCount = data.length;
  const numSelected = selected.length;

  const handleAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = data.map((item) => item.node.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSingleClick = (e, id) => {
    e.stopPropagation();
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

  const sortHandler = (sortField) => {
    const oldSort = params.sortDirection;
    let newSort;
    if (params.sortField === sortField) {
      newSort = oldSort === "ASC" ? "DESC" : "ASC";
    } else {
      newSort = "ASC";
    }
    setParams({
      ...params,
      sortField,
      sortDirection: newSort,
    });
  };

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
              <TableCell colSpan={table.tableColumn.length} align="left" padding="none">
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
              table.tableColumn.map((cell, idx) => (
                <TableCell
                  key={cell.field}
                  align={cell.align}
                  padding={idx === 0 && bulkMutations.length > 0 ? "none" : "default"}
                  sortDirection={
                    params.sortField === cell.sortField
                      ? params.sortDirection.toLowerCase()
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
                  onClick={() => navigate(node.id)}
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
                  {table.tableColumn.map((cell, idx) => {
                    return (
                      <TableCell
                        key={cell.field}
                        align={cell.align}
                        padding={idx === 0 && bulkMutations.length > 0 ? "none" : "default"}
                        width={cell.width ? cell.width : "auto"}
                      >
                        {cell.render ? cell.render(node[cell.field], item) : node[cell.field]}
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
                colSpan={
                  bulkMutations.length > 0
                    ? table.tableColumn.length + 1
                    : table.tableColumn.length
                }
              >
                <Typography variant="subtitle1" color="textSecondary">
                  No {pluralAppName.toLowerCase()} found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ResponsiveTable>
    </TableContainer>
  );
};
