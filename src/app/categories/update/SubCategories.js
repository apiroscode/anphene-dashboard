import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { Card } from "@/components/Card";
import { SimpleList } from "@/components/SimpleList";

import { getCategories } from "../queries";
import { BulkDeleteCategory } from "../mutations";

export const SubCategories = ({ category }) => {
  const navigate = useNavigate();
  const [bulkDelete, { loading }] = useMutation(BulkDeleteCategory);

  const buttonCreate = (
    <Button color="primary" onClick={() => navigate(`create`)}>
      CREATE SUBCATEGORY
    </Button>
  );

  const listProps = {
    placeholder: "subcategories",
    query: getCategories,
    queryField: "categories",
    vars: { parent: category.id },
    table: {
      action: (node) => navigate(`/categories/${node.id}`),
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

  return (
    <Card title="All Subcategories" action={buttonCreate} useDense>
      <SimpleList {...listProps} />
    </Card>
  );
};
