import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { BULK_DELETE_CATEGORY } from "@/graphql/mutations/categories";
import { GET_CATEGORIES } from "@/graphql/queries/categories";

import { List } from "@/components/Template";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_CATEGORY);

  const props = {
    appName: "Category",
    query: GET_CATEGORIES,
    queryField: "categories",
    vars: { level: 0 },
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      tableColumn: [
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
