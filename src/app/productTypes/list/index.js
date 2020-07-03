import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";
import { FilterRadioBox } from "@/components/ListFilters";

import { GetProductTypes } from "../queries";
import { BulkDeleteProductType } from "../mutations";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BulkDeleteProductType);

  const props = {
    appName: "Product Type",
    query: GetProductTypes,
    queryField: "productTypes",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "configurable",
        label: "Configurable",
        defaultValue: "CONFIGURABLE",
        items: [
          {
            label: "Yes",
            value: "CONFIGURABLE",
          },
          {
            label: "No",
            value: "SIMPLE",
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
          label: "Type Name",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Type",
          field: "hasVariants",
          align: "left",
          render: (hasVariants) => (hasVariants ? "Configurable" : "Simple Product"),
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
