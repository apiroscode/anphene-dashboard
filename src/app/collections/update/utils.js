import React from "react";

import { useSnackbar } from "notistack";

import { Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation, useSelected } from "@/utils/hooks";

import { GET_PRODUCTS } from "@/graphql/queries/products";

import { ACTION } from "@/app/_components/AssignProducts";

import { CollectionAddProducts, CollectionRemoveProducts } from "../mutations";

export const useAssignProductsProps = (props) => {
  const { collection, listProps, params, setParams } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [addProducts, { loading }] = useMutation(CollectionAddProducts);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const onCloseDialog = () => {
    setSelected([]);
    setParams({ action: undefined });
  };

  const onAssignProduct = async (selected) => {
    const result = await addProducts({
      variables: { collectionId: collection.id, products: selected },
      refetchQueries: [
        {
          query: GET_PRODUCTS,
          variables: {
            ...listProps,
          },
        },
      ],
    });
    if (result === undefined) return;

    const {
      data: {
        collectionAddProducts: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`The products has been added successfully.`, {
        variant: "success",
      });
      onCloseDialog();
    }
  };

  return {
    params,
    title: "Assign Products",
    onClose: onCloseDialog,
    onAssign: onAssignProduct,
    loading,
    selected,
    handleSingleClick,
    vars: {
      notInCollections: [collection.id],
    },
  };
};

export const useProductSimpleListProps = (props) => {
  const { collection, setListProps, setParams } = props;
  const [removeProducts, { loading }] = useMutation(CollectionRemoveProducts);

  const action = (
    <Button color="primary" onClick={() => setParams({ action: ACTION })}>
      ASSIGN PRODUCT
    </Button>
  );
  return {
    setListProps,
    title: `Products in ${collection.name}`,
    action,
    vars: { collections: [collection.id] },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: removeProducts,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
        selector: "products",
        vars: {
          collectionId: collection.id,
        },
      },
    ],
  };
};
