import React from "react";

import { useSnackbar } from "notistack";

import { Button, capitalize } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation, useSelected } from "@/utils/hooks";

export const useAssignItem = (props) => {
  /**
   * Example.
   *   const assignCategoriesProps = useAssignProductsProps({
   *    instance: collection,
   *    listProps,
   *    params,
   *    setParams,
   *    mutation: AddSaleCatalogues,
   *    refetchQuery: GetSimpleCategories,
   *    queryField: 'categories',
   *    querySelector: 'saleCataloguesAdd',
   *    appName: "categories',
   *    vars: 'notInSales'
   *  });
   */
  const {
    instance,
    listProps,
    params,
    setParams,
    mutation,
    refetchQuery,
    queryField,
    querySelector,
    appName,
    varIdMutation = "id",
    vars,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading }] = useMutation(mutation);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const onCloseDialog = () => {
    setSelected([]);
    setParams({ action: undefined });
  };

  const onAssignItem = async (selected) => {
    const result = await mutate({
      variables: { [varIdMutation]: instance.id, [querySelector]: selected },
      refetchQueries: [
        {
          query: refetchQuery,
          variables: {
            ...listProps,
          },
        },
      ],
    });
    if (result === undefined) return;

    const {
      data: {
        [queryField]: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`The ${appName} has been added successfully.`, {
        variant: "success",
      });
      onCloseDialog();
    }
  };

  return {
    params,
    title: `Assign ${capitalize(appName)}`,
    onClose: onCloseDialog,
    onAssign: onAssignItem,
    loading,
    selected,
    handleSingleClick,
    vars: {
      [vars]: [instance.id],
    },
  };
};

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
