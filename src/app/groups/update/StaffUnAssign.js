import React from "react";

import { useSnackbar } from "notistack";

import { Dialog } from "@/components/Dialog";

export const ACTION = "unassign-staff";
export const StaffUnAssign = (props) => {
  const {
    params,
    handleClose,
    allStaff,

    loading,
    setSelected,
    unAssign,
    groupId,
    groupName,
  } = props;
  const { action, ids } = params;
  const { enqueueSnackbar } = useSnackbar();

  const handleUnAssign = async () => {
    const result = await unAssign({ variables: { groupId, staffIds: ids } });
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
      enqueueSnackbar(`${ids.length} staff unassign`, {
        variant: "success",
      });
      setSelected([]);
      handleClose();
    }
  };
  const contentText = ids ? (
    ids.length === 1 ? (
      <strong>{allStaff.find((x) => x.id === ids[0])?.name}</strong>
    ) : (
      "these staff"
    )
  ) : (
    ""
  );
  return (
    <Dialog
      open={action === ACTION}
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
          Are you sure you want to unassign {contentText} from <strong>{groupName}</strong>?
        </>
      }
    />
  );
};
