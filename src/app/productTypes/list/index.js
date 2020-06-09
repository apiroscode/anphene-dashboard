import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { GET_PRODUCT_TYPES } from "@/graphql/queries/productTypes";
import { BULK_DELETE_PRODUCT_TYPE } from "@/graphql/mutations/productTypes";

import { List } from "@/components/Template";
import { FilterRadioBox } from "@/components/Template/List/Filters";

export default () => {
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_PRODUCT_TYPE);

  const props = {
    appName: "Product Type",
    query: GET_PRODUCT_TYPES,
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
      tableColumn: [
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
