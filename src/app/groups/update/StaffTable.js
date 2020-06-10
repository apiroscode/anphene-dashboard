import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
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
import { useMutation } from "@/utils/hooks";

import { UNASSIGN_STAFF } from "@/graphql/mutations/groups";

import { Checkbox } from "@/components/Checkbox";
import { Dialog } from "@/components/Dialog";
import { ResponsiveTable } from "@/components/Table";

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

const UnAssignDialog = (props) => {
  const {
    open,
    setOpen,
    loading,
    selected,
    setSelected,
    unAssign,
    groupId,
    groupName,
    singleData,
    setSingleData,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const handleUnAssign = async () => {
    let unAssignId;
    if (singleData) {
      unAssignId = [singleData.id];
    } else {
      unAssignId = selected;
    }

    const result = await unAssign({ variables: { groupId, staffIds: unAssignId } });
    if (result === undefined) return;

    const {
      data: {
        groupStaffUnassign: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`${unAssignId.length} staff unassign`, {
        variant: "success",
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelected([]);
    setOpen(false);
    setSingleData(undefined);
  };

  return (
    <Dialog
      open={open}
      handleOk={handleUnAssign}
      handleClose={handleClose}
      title="Unassign Group From Product Type"
      okText="UNASSIGN"
      okProps={{
        loading: loading,
      }}
      cancelProps={{
        disabled: loading,
      }}
      content={
        <>
          Are you sure you want to unassign{" "}
          {singleData ? <strong>{singleData.name}</strong> : "these staff"} from{" "}
          <strong>{groupName}</strong>?
        </>
      }
    />
  );
};

export const StaffTable = ({ group }) => {
  const items = maybe(() => group.users, []);
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState(items);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [singleData, setSingleData] = useState(undefined);
  const [unAssign, { loading: unAssignLoading }] = useMutation(UNASSIGN_STAFF);

  useEffect(() => {
    setValues(items);
  }, [items]);

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const dataCount = values.length;
  const numSelected = selected.length;
  const unAssignProps = {
    open,
    setOpen,
    loading: unAssignLoading,
    selected,
    setSelected,
    unAssign,
    groupId: group.id,
    groupName: group.name,
    singleData,
    setSingleData,
  };

  const handleSingleClick = (id, name) => {
    setSingleData({
      id,
      name,
    });
    setOpen(true);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = values.map((field) => field.id);
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
                    setOpen(true);
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
                      onClick={(e) => handleClickCheckBox(e, field.id)}
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
                        handleSingleClick(field.id, field.name);
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
      <UnAssignDialog {...unAssignProps} />
    </>
  );
};
