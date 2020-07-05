import { useSnackbar } from "notistack";

import { capitalize } from "@material-ui/core";

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
