import React from "react";

import { FormControlLabel, FormGroup } from "@material-ui/core";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Card";

export const Groups = (props) => {
  const { groupsData, groups, setValue } = props;

  const handleGroups = (e) => {
    if (e.target.checked) {
      setValue("groups", [...groups, e.target.name]);
    } else {
      setValue(
        "groups",
        groups.filter((item) => item !== e.target.name)
      );
    }
  };

  return (
    <Card title="Groups">
      <FormGroup>
        {groupsData.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={groups.includes(item.id)}
                onChange={handleGroups}
                name={item.id}
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
