import React from "react";

import { List } from "@/components/Template";
import { GET_STAFF_USERS } from "@/graphql/queries/staff";

export default () => {
  const props = {
    appName: "Staff Member",
    query: GET_STAFF_USERS,
    queryField: "staffUsers",
    filters: [
      {
        type: "radioBox",
        field: "status",
        label: "Is staff still active",
        defaultValue: "ACTIVE",
        items: [
          {
            label: "Active",
            value: "ACTIVE",
          },
          {
            label: "Not Active",
            value: "DEACTIVATED",
          },
        ],
      },
    ],
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
        {
          label: "Email",
          field: "email",
          align: "left",
          sortField: "EMAIL",
        },
        {
          label: "Active ?",
          field: "isActive",
          align: "center",
          render: (value) => (value ? "Active" : "Not Active"),
        },
      ],
    },
  };
  return <List {...props} />;
};
