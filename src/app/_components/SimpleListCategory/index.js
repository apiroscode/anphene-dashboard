import React from "react";

import { useNavigate } from "react-router-dom";

import { PermissionEnum } from "@/config/enum";
import { usePermissions } from "@/utils/hooks";

import { Card } from "@/components/Card";
import { SimpleList } from "@/components/SimpleList";

import { GetSimpleCategories } from "../../categories/queries";

export const SimpleListCategory = (props) => {
  const {
    title,
    action = null,
    bulkMutations = [],
    bulkLoading = false,
    vars,
    setListProps,
  } = props;
  const [gotPermission] = usePermissions(PermissionEnum.MANAGE_CATEGORIES);

  const navigate = useNavigate();

  const listProps = {
    placeholder: "Categories",
    query: GetSimpleCategories,
    queryField: "categories",
    vars: vars,
    table: {
      action: (node) => (gotPermission ? navigate(`/categories/${node.id}`) : undefined),
      column: [
        {
          label: "Name",
          field: "name",
          align: "left",
          render: (_, node) => `${"-".repeat(node?.level)}${node?.name}`,
        },
        {
          label: "Products",
          field: "products.totalCount",
          align: "center",
        },
      ],
    },
    bulkLoading,
    bulkMutations,
    setListProps,
  };

  return (
    <Card title={title} action={action} useDense>
      <SimpleList {...listProps} />
    </Card>
  );
};
