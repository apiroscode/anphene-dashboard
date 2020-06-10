import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { GET_GROUPS } from "@/graphql/queries/groups";
import { BULK_DELETE_GROUP } from "@/graphql/mutations/groups";

import { List } from "@/components/Template";

export default () => {
  const [bulkDeleteMutation, { loading }] = useMutation(BULK_DELETE_GROUP);
  const props = {
    appName: "Group",
    query: GET_GROUPS,
    queryField: "groups",
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      tableColumn: [
        {
          label: "Name",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
      ],
    },
    bulkLoading: loading,
    bulkMutations: [
      {
        mutation: bulkDeleteMutation,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
      },
    ],
  };
  return <List {...props} />;
};
