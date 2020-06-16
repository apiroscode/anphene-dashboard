import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { GET_STAFF_USERS } from "@/graphql/queries/staff";
import { BULK_ACTIVATE_STAFF, BULK_DELETE_STAFF } from "@/graphql/mutations/staff";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/Template";
import { FilterRadioBox } from "@/components/Template/List/Filters";
import { StatusLabel } from "@/components/StatusLabel";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BULK_DELETE_STAFF);
  const [bulkActivate, { loading: activateLoading }] = useMutation(BULK_ACTIVATE_STAFF);

  const props = {
    appName: "Staff Member",
    query: GET_STAFF_USERS,
    queryField: "staffUsers",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "status",
        label: "Staff status",
        defaultValue: "ACTIVE",
        items: [
          {
            label: "Active",
            value: "ACTIVE",
          },
          {
            label: "Disabled",
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
          sortField: "EMAIL",
        },
        {
          label: "Groups",
          field: "groups",
          align: "left",
          render: (value) => value.map((item) => item.name).join(", "),
        },
        {
          label: "Status",
          field: "isActive",
          align: "center",
          render: (isActive) => (
            <StatusLabel
              status={isActive ? "success" : "error"}
              label={isActive ? "Active" : "Disabled"}
            />
          ),
        },
      ],
    },
    bulkLoading: deleteLoading || activateLoading,
    bulkMutations: [
      {
        mutation: bulkActivate,
        type: "text",
        label: "activate",
        vars: {
          isActive: true,
        },
      },
      {
        mutation: bulkActivate,
        type: "text",
        label: "deactivate",
        vars: {
          isActive: false,
        },
      },
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
