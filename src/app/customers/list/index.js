import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";
import { FilterRange } from "@/components/ListFilters";

import { GetCustomers } from "../queries";
import { BulkDeleteCustomer } from "../mutations";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BulkDeleteCustomer);

  const props = {
    appName: "Customer",
    query: GetCustomers,
    queryField: "customers",
    filters: [
      {
        component: <FilterRange filterType="date" />,
        field: "dateJoined",
        label: "Join Date",
        type: "range",
      },
    ],
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "Customer Email",
          field: "email",
          align: "left",
          sortField: "EMAIL",
        },
        // TODO: MUST INCLUDE No. of orders when order finish
      ],
    },
    bulkLoading: deleteLoading,
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
