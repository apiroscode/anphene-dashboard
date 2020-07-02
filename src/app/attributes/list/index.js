import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";
import { FilterRadioBox } from "@/components/ListFilters";

import { GetAttributes } from "../queries";
import { BulkDeleteAttribute } from "../mutations";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BulkDeleteAttribute);

  const props = {
    appName: "Attribute",
    query: GetAttributes,
    queryField: "attributes",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "visibleInStorefront",
        label: "Visible on Product Page",
        defaultValue: true,
        items: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
      },
      {
        component: <FilterRadioBox />,
        field: "filterableInDashboard",
        label: "Filterable in Dashboard",
        defaultValue: true,
        items: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
      },
      {
        component: <FilterRadioBox />,
        field: "filterableInStorefront",
        label: "Filterable in Storefront",
        defaultValue: true,
        items: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
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
          label: "Attribute Code",
          field: "slug",
          align: "left",
          sortField: "SLUG",
        },
        {
          label: "Default Label",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Visible",
          field: "visibleInStorefront",
          align: "center",
          render: (value) => (value ? "Yes" : "No"),
        },
        {
          label: "Filterable in Dashboard",
          field: "filterableInDashboard",
          align: "center",
          render: (value) => (value ? "Yes" : "No"),
        },
        {
          label: "Filterable in Storefront",
          field: "filterableInStorefront",
          align: "center",
          render: (value) => (value ? "Yes" : "No"),
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
