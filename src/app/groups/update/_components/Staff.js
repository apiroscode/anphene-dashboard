import React from "react";

import { Button } from "@material-ui/core";

import { useQS } from "@/utils/hooks";

import { Card } from "@/components/Card";

import { StaffTable } from "./StaffTable";
import { ACTION as ASSIGN_ACTION, StaffAssign } from "./StaffAssign";

export const Staff = ({ group }) => {
  const [params, setParams] = useQS({
    action: undefined,
    ids: undefined,
  });

  const handleClose = () => {
    setParams({
      action: undefined,
      ids: undefined,
    });
  };

  const baseProps = {
    group,
    params,
    setParams,
    handleClose,
  };

  return (
    <Card
      title="Staff"
      action={
        <Button color="primary" onClick={() => setParams({ action: ASSIGN_ACTION })}>
          ASSIGN STAFF
        </Button>
      }
      useDense
    >
      <StaffTable {...baseProps} />
      <StaffAssign {...baseProps} />
    </Card>
  );
};
