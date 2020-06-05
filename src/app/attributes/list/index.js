import React from "react";
import { List } from "@/components/Template";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { GET_ATTRIBUTES } from "@/graphql/queries/attributes";
import { BULK_DELETE_ATTRIBUTE } from "@/graphql/mutations/attributes";
import { useMutation } from "@/utils/hooks";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_ATTRIBUTE);

  const props = {
    appName: "Attribute",
    query: GET_ATTRIBUTES,
    queryField: "attributes",
    filters: [
      {
        type: "radioBox",
        field: "visibleInStorefront",
        label: "Visible on Product Page ",
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
        type: "radioBox",
        field: "filterableInDashboard",
        label: "Filterable in Dashboard",
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
        type: "radioBox",
        field: "filterableInStorefront",
        label: "Filterable in Storefront",
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
      tableColumn: [
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
