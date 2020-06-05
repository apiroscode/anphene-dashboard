import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { GET_STAFF_USERS } from "@/graphql/queries/staff";
import {
  BULK_ACTIVATE_STAFF,
  BULK_DEACTIVATE_STAFF,
  BULK_DELETE_STAFF,
} from "@/graphql/mutations/staff";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/Template";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BULK_DELETE_STAFF);
  const [bulkActivate, { loading: activateLoading }] = useMutation(BULK_ACTIVATE_STAFF);
  const [bulkDeactivate, { loading: deactivateLoading }] = useMutation(BULK_DEACTIVATE_STAFF);

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
          label: "Groups",
          field: "permissionGroups",
          align: "left",
          render: (value) => value.map((item) => item.name).join(", "),
        },
        {
          label: "Active ?",
          field: "isActive",
          align: "center",
          render: (value) => (value ? "Active" : "Not Active"),
        },
      ],
    },
    bulkLoading: deleteLoading || activateLoading || deactivateLoading,
    bulkMutations: [
      {
        mutation: bulkActivate,
        type: "text",
        label: "activate",
      },
      {
        mutation: bulkDeactivate,
        type: "text",
        label: "deactivate",
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
