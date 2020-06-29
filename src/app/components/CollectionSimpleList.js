import React from "react";

import { useNavigate } from "react-router-dom";

import { PermissionEnum } from "@/config/enum";
import { usePermissions } from "@/utils/hooks";

import { GET_SIMPLE_COLLECTIONS } from "@/graphql/queries/collections";
import { Card, SimpleList } from "@/components/Template";

export const CollectionSimpleList = (props) => {
  const {
    title,
    action = null,
    bulkMutations = [],
    bulkLoading = false,
    vars,
    setListProps,
  } = props;
  const [gotPermission] = usePermissions(PermissionEnum.MANAGE_COLLECTIONS);

  const navigate = useNavigate();

  const listProps = {
    placeholder: "Collections",
    query: GET_SIMPLE_COLLECTIONS,
    queryField: "collections",
    vars: vars,
    table: {
      action: (node) => (gotPermission ? navigate(`/collections/${node.id}`) : undefined),
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "Name",
          field: "name",
          align: "left",
          sortField: "NAME",
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
