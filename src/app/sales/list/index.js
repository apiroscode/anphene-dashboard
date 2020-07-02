import React from "react";

import dayjs from "dayjs";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { GET_SALES } from "@/graphql/queries/sales";
import { BULK_DELETE_SALE } from "@/graphql/mutations/sales";

import { List } from "@/components/Template";

import { FilterCheckBox, FilterRadioBox, FilterRange } from "@/components/Template/List/Filters";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_SALE);

  const props = {
    appName: "Sale",
    query: GET_SALES,
    queryField: "sales",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "saleType",
        label: "Discount Type",
        defaultValue: "PERCENTAGE",
        items: [
          {
            label: "Fixed Amount",
            value: "FIXED",
          },
          {
            label: "Percentage",
            value: "PERCENTAGE",
          },
        ],
      },
      {
        component: <FilterRange filterType="date" />,
        field: "started",
        label: "Started",
        type: "range",
      },
      {
        component: <FilterCheckBox />,
        field: "status",
        label: "Status",
        defaultValue: [],
        items: [
          {
            label: "Active",
            value: "ACTIVE",
          },
          {
            label: "Expired",
            value: "EXPIRED",
          },
          {
            label: "Scheduled",
            value: "SCHEDULED",
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
          label: "Starts",
          field: "startDate",
          align: "right",
          sortField: "START_DATE",
          render: (value) => dayjs(value).fromNow(),
        },
        {
          label: "Ends",
          field: "endDate",
          align: "right",
          sortField: "END_DATE",
          render: (value) => (value ? dayjs(value).fromNow() : "-"),
        },
        {
          label: "Value",
          field: "value",
          align: "right",
          sortField: "VALUE",
          render: (value, { type }) =>
            value ? (type === "PERCENTAGE" ? `${value} %` : `Rp ${value}`) : "0",
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
