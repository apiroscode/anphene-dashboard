import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";

import { getCategories } from "../queries";
import { BulkDeleteCategory } from "../mutations";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BulkDeleteCategory);

  const props = {
    appName: "Category",
    query: getCategories,
    queryField: "categories",
    vars: { level: 0 },
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "Category Name",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Subcategories",
          field: "children.totalCount",
          align: "center",
          sortField: "SUBCATEGORY_COUNT",
        },
        {
          label: "Products",
          field: "products.totalCount",
          align: "center",
          sortField: "PRODUCT_COUNT",
        },
      ],
    },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: bulkDelete,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
      },
    ],
  };

  return <List {...props} />;
};
