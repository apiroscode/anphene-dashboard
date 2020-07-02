import React from "react";

import { useSnackbar } from "notistack";

import { Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation, useSelected } from "@/utils/hooks";

import { GET_PRODUCTS } from "@/graphql/queries/products";

import { ACTION_PRODUCTS, ACTION_CATEGORIES, ACTION_COLLECTIONS } from "@/app/_components";
import { ADD_SALE_CATALOGUES, REMOVE_SALE_CATALOGUES } from "@/graphql/mutations/sales";
import { GET_SIMPLE_CATEGORIES } from "@/graphql/queries/categories";
import { GET_SIMPLE_COLLECTIONS } from "@/graphql/queries/collections";

export const useAssignProductsProps = (props) => {
  const { sale, listProps, params, setParams } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [addProducts, { loading }] = useMutation(ADD_SALE_CATALOGUES);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const onCloseDialog = () => {
    setSelected([]);
    setParams({ action: undefined });
  };

  const onAssignProduct = async (selected) => {
    const result = await addProducts({
      variables: { id: sale.id, products: selected },
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
        saleCataloguesAdd: { errors },
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
      notInSales: [sale.id],
    },
  };
};

export const useProductSimpleListProps = (props) => {
  const { sale, setListProps, setParams } = props;
  const [removeProducts, { loading }] = useMutation(REMOVE_SALE_CATALOGUES);

  const action = (
    <Button color="primary" onClick={() => setParams({ action: ACTION_PRODUCTS })}>
      ASSIGN PRODUCT
    </Button>
  );

  return {
    setListProps,
    title: `Products in ${sale.name}`,
    action,
    vars: { sales: [sale.id] },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: removeProducts,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
        selector: "products",
        vars: {
          id: sale.id,
        },
      },
    ],
  };
};

export const useAssignCategoriesProps = (props) => {
  const { sale, listProps, params, setParams } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [addCategories, { loading }] = useMutation(ADD_SALE_CATALOGUES);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const onCloseDialog = () => {
    setSelected([]);
    setParams({ action: undefined });
  };

  const onAssignCategory = async (selected) => {
    const result = await addCategories({
      variables: { id: sale.id, categories: selected },
      refetchQueries: [
        {
          query: GET_SIMPLE_CATEGORIES,
          variables: {
            ...listProps,
          },
        },
      ],
    });
    if (result === undefined) return;

    const {
      data: {
        saleCataloguesAdd: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`The categories has been added successfully.`, {
        variant: "success",
      });
      onCloseDialog();
    }
  };

  return {
    params,
    title: "Assign Categories",
    onClose: onCloseDialog,
    onAssign: onAssignCategory,
    loading,
    selected,
    handleSingleClick,
    vars: {
      notInSales: [sale.id],
    },
  };
};

export const useCategorySimpleListProps = (props) => {
  const { sale, setListProps, setParams } = props;
  const [removeCategories, { loading }] = useMutation(REMOVE_SALE_CATALOGUES);

  const action = (
    <Button color="primary" onClick={() => setParams({ action: ACTION_CATEGORIES })}>
      ASSIGN CATEGORY
    </Button>
  );

  return {
    setListProps,
    title: `Category in ${sale.name}`,
    action,
    vars: { sales: [sale.id] },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: removeCategories,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
        selector: "categories",
        vars: {
          id: sale.id,
        },
      },
    ],
  };
};

export const useAssignPCollectionsProps = (props) => {
  const { sale, listProps, params, setParams } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [addCollections, { loading }] = useMutation(ADD_SALE_CATALOGUES);
  const { selected, setSelected, handleSingleClick } = useSelected();

  const onCloseDialog = () => {
    setSelected([]);
    setParams({ action: undefined });
  };

  const onAssignCollection = async (selected) => {
    const result = await addCollections({
      variables: { id: sale.id, collections: selected },
      refetchQueries: [
        {
          query: GET_SIMPLE_COLLECTIONS,
          variables: {
            ...listProps,
          },
        },
      ],
    });
    if (result === undefined) return;

    const {
      data: {
        saleCataloguesAdd: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`The collections has been added successfully.`, {
        variant: "success",
      });
      onCloseDialog();
    }
  };

  return {
    params,
    title: "Assign Collections",
    onClose: onCloseDialog,
    onAssign: onAssignCollection,
    loading,
    selected,
    handleSingleClick,
    vars: {
      notInSales: [sale.id],
    },
  };
};

export const useCollectionSimpleListProps = (props) => {
  const { sale, setListProps, setParams } = props;
  const [removeCollections, { loading }] = useMutation(REMOVE_SALE_CATALOGUES);

  const action = (
    <Button color="primary" onClick={() => setParams({ action: ACTION_COLLECTIONS })}>
      ASSIGN COLLECTION
    </Button>
  );

  return {
    setListProps,
    title: `Collections in ${sale.name}`,
    action,
    vars: { sales: [sale.id] },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: removeCollections,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
        selector: "collections",
        vars: {
          id: sale.id,
        },
      },
    ],
  };
};
