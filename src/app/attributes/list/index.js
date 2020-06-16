import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { GET_ATTRIBUTES } from "@/graphql/queries/attributes";
import { BULK_DELETE_ATTRIBUTE } from "@/graphql/mutations/attributes";

import { List } from "@/components/Template";
import { FilterRadioBox } from "@/components/Template/List/Filters";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_ATTRIBUTE);

  const props = {
    appName: "Attribute",
    query: GET_ATTRIBUTES,
    queryField: "attributes",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "visibleInStorefront",
        label: "Visible on Product Page ",
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
