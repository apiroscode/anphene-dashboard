import React from "react";

import dayjs from "dayjs";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";
import { GET_VOUCHERS } from "@/graphql/queries/vouchers";
import { BULK_DELETE_VOUCHER } from "@/graphql/mutations/vouchers";

import { List } from "@/components/Template";

import { FilterCheckBox, FilterRadioBox, FilterRange } from "@/components/Template/List/Filters";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_VOUCHER);

  const props = {
    appName: "Voucher",
    query: GET_VOUCHERS,
    queryField: "vouchers",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "voucherType",
        label: "Voucher Type",
        defaultValue: "ENTIRE_ORDER",
        items: [
          {
            label: "Entire Order",
            value: "ENTIRE_ORDER",
          },
          {
            label: "Specific Product",
            value: "SPECIFIC_PRODUCT",
          },
          {
            label: "Free Shipping",
            value: "SHIPPING",
          },
        ],
      },
      {
        component: <FilterRadioBox />,
        field: "discountType",
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
        component: <FilterRange filterType="number" />,
        field: "timesUsed",
        label: "Times used",
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
        field: "CODE",
        direction: "ASC",
      },
      column: [
        {
          label: "Code",
          field: "code",
          align: "left",
          sortField: "CODE",
        },
        {
          label: "Min. Spent",
          field: "minSpentAmount",
          align: "right",
          sortField: "MINIMUM_SPENT_AMOUNT",
          render: (value) => (value ? value : "-"),
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
          field: "discountValue",
          align: "right",
          sortField: "VALUE",
          render: (value, { type }) =>
            value ? (type === "PERCENTAGE" ? `${value} %` : `Rp ${value}`) : "0",
        },
        {
          label: "Voucher Type",
          field: "type",
          align: "right",
          render: (value) =>
            value === "SHIPPING"
              ? "FREE SHIPPING"
              : value === "ENTIRE_ORDER"
              ? "ENTIRE ORDER"
              : "SPECIFIC PRODUCT",
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
