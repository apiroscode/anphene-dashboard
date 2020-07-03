import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";

import { GetGroups } from "../queries";
import { BulkDeleteGroup } from "../mutations";

export default () => {
  const [bulkDeleteMutation, { loading }] = useMutation(BulkDeleteGroup);

  const props = {
    appName: "Group",
    query: GetGroups,
    queryField: "groups",
    table: {
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
