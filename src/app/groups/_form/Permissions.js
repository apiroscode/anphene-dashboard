import React from "react";
import { FormControlLabel, FormGroup } from "@material-ui/core";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Card";

export const Permissions = (props) => {
  const { allPermissions, permissions, handlePermission } = props;

  return (
    <Card title="Permissions">
      <FormGroup>
        {allPermissions.map((item) => (
          <FormControlLabel
            key={item.code}
            control={
              <Checkbox
                checked={permissions.includes(item.code)}
                onChange={handlePermission}
                name={item.code}
                size="small"
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Card>
  );
};
