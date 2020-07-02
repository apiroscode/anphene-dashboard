import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";

import { getSupplier } from "../queries";
import { BulkDeleteSupplier } from "../mutations";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BulkDeleteSupplier);

  const props = {
    appName: "Supplier",
    query: getSupplier,
    queryField: "suppliers",
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
        {
          label: "Email",
          field: "email",
          align: "left",
        },
        {
          label: "Phone",
          field: "phone",
          align: "left",
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
