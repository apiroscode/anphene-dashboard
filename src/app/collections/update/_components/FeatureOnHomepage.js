import React from "react";

import { Divider, FormControlLabel } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { Checkbox } from "@/components/Checkbox";

import { AssignCollectionHomepage } from "../../mutations";

export const FeatureOnHomePage = (props) => {
  const { collection } = props;
  const [assign, { loading }] = useMutation(AssignCollectionHomepage);

  const handleChecked = async (type) => {
    await assign({
      variables: {
        collection: collection.featureOnHomepage ? null : collection.id,
      },
    });
  };

  return (
    <>
      <Divider />
      <FormControlLabel
        disabled={loading}
        control={
          <Checkbox
            checked={collection.featureOnHomepage}
            onChange={handleChecked}
            name="checkedB"
            color="primary"
          />
        }
        label="Feature on Homepage"
      />
    </>
  );
};
