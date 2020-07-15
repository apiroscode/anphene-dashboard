import React from "react";

import { Button, capitalize } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

export const useSimpleListProps = (props) => {
  /**
   * Example.
   *   const productSimpleListProps = useProductSimpleListProps({
        instance: sale,
        instanceName: "name",
        removeMutation: REMOVE_SALE_CATALOGUES
        setListProps: setProductListProps,
        setParams,
        assignAction: ACTION_PRODUCTS,
        appName: 'products',
        selector: 'products',
      });
   */
  const {
    instance,
    instanceName = "name",
    removeMutation,
    setListProps,
    setParams,
    assignAction,
    appName,
    selector,
    vars,
    varIdMutation = "id",
  } = props;
  const [remove, { loading }] = useMutation(removeMutation);
  const action = (
    <Button color="primary" onClick={() => setParams({ action: assignAction })}>
      ASSIGN {appName.toUpperCase()}
    </Button>
  );

  return {
    setListProps,
    title: `${capitalize(appName)} in ${instance[instanceName]}`,
    action,
    vars: { [vars]: [instance.id] },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: remove,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
        selector,
        vars: {
          [varIdMutation]: instance.id,
        },
      },
    ],
  };
};
