import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { maybe } from "@/utils";
import { useMutation, useSelected } from "@/utils/hooks";

import { Checkbox } from "@/components/Checkbox";
import { ResponsiveTable } from "@/components/_table";

import { UnassignStaff } from "../../mutations";

import { ACTION as UNASSIGN_ACTION, StaffUnAssign } from "./StaffUnAssign";

const useStyles = makeStyles(
  (theme) => ({
    tableBodyRow: {
      cursor: "pointer",
    },
    action: {
      width: theme.spacing(12),
    },
  }),
  { name: "GroupStaff" }
);

export const StaffTable = (props) => {
  const { group, params, handleClose, setParams } = props;
  const allStaff = maybe(() => group.users, []);
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState(allStaff);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const [unAssign, { loading: unAssignLoading }] = useMutation(UnassignStaff);

  useEffect(() => {
    setValues(allStaff);
  }, [allStaff]);
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

  const unAssignProps = {
    params,
    handleClose,
    allStaff,

    loading: unAssignLoading,
    setSelected,
    unAssign,
    groupId: group.id,
    groupName: group.name,
  };

  return (
    <>
      <ResponsiveTable>
        <TableHead>
          <TableRow selected={numSelected > 0}>
            <TableCell padding="checkbox" align="center">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < dataCount}
                checked={dataCount > 0 && numSelected === dataCount}
                onChange={handleSelectAllClick}
                disabled={unAssignLoading}
                size="small"
              />
            </TableCell>
            {numSelected > 0 ? (
              <TableCell colSpan={3}>Selected {numSelected} items</TableCell>
            ) : (
              <>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </>
            )}
            <TableCell align="center" className={classes.action}>
              {numSelected > 0 && (
                <Button
                  color="primary"
                  onClick={() => {
                    setParams({ action: UNASSIGN_ACTION, ids: selected });
                  }}
                >
                  UNASSIGN
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        {values.length > 0 ? (
          <TableBody>
            {values.map((field, index) => {
              const isItemSelected = isSelected(field.id);
              return (
                <TableRow
                  hover
                  key={field.id}
                  className={classes.tableBodyRow}
                  selected={isItemSelected}
                  index={index}
                  onClick={() => navigate(`/configuration/staff/${field.id}`)}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(e) => handleSingleClick(e, field.id)}
                      disabled={unAssignLoading}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.email}</TableCell>
                  <TableCell>{field.isActive ? "Active" : "Disabled"}</TableCell>
                  <TableCell align="center" className={classes.action}>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        setParams({ action: UNASSIGN_ACTION, ids: [field.id] });
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
                  No staff assigned
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </ResponsiveTable>
      <StaffUnAssign {...unAssignProps} />
    </>
  );
};
