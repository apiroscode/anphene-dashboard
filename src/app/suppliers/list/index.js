import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { GET_SUPPLIERS } from "@/graphql/queries/suppliers";
import { BULK_DELETE_SUPPLIERS } from "@/graphql/mutations/suppliers";

import { List } from "@/components/Template";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_SUPPLIERS);

  const props = {
    appName: "Supplier",
    query: GET_SUPPLIERS,
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
