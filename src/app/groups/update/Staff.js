import React from "react";

import { Card } from "@/components/Template";

import { StaffTable } from "./StaffTable";
import { StaffAssign } from "./StaffAssign";

export const Staff = ({ group }) => {
  return (
    <Card title="Staff" action={<StaffAssign group={group} />} useDense>
      <StaffTable group={group} />
    </Card>
  );
};
