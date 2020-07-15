import React from "react";

import { FormControlLabel } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { Checkbox } from "@/components/Checkbox";

import { AssignNavigation } from "../../mutations";

export const SetNavigation = (props) => {
  const { menu } = props;
  const [assign, { loading }] = useMutation(AssignNavigation);

  const handleMainNavigation = async () => {
    await assign({
      variables: {
        menu: menu.isMainNavigation ? null : menu.id,
        navigationType: "MAIN",
      },
    });
  };

  const handleSecondaryNavigation = async () => {
    await assign({
      variables: {
        menu: menu.isSecondaryNavigation ? null : menu.id,
        navigationType: "SECONDARY",
      },
    });
  };

  return (
    <div>
      <FormControlLabel
        disabled={loading}
        control={
          <Checkbox
            checked={menu.isMainNavigation}
            onChange={handleMainNavigation}
            name="checkedB"
            color="primary"
          />
        }
        label="Set as main navigation"
      />
      <FormControlLabel
        disabled={loading}
        control={
          <Checkbox
            checked={menu.isSecondaryNavigation}
            onChange={handleSecondaryNavigation}
            name="checkedB"
            color="primary"
          />
        }
        label="Set as secondary navigation"
      />
    </div>
  );
};
