import React from "react";

import { Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation, useQS } from "@/utils/hooks";

import { GET_MENUS } from "@/graphql/queries/navigations";
import { BULK_DELETE_MENU } from "@/graphql/mutations/navigations";

import { List } from "@/components/Template";
import { ACTION, CreateMenu } from "./CreateMenu";

export default () => {
  const [params, setParams] = useQS({ action: undefined });
  const [bulkDelete, { loading }] = useMutation(BULK_DELETE_MENU);

  const actions = [
    <Button
      key="add-navigation"
      variant="contained"
      color="primary"
      onClick={() => setParams({ action: ACTION })}
    >
      Create Menu
    </Button>,
  ];

  const props = {
    appName: "Navigation",
    query: GET_MENUS,
    queryField: "menus",
    isCreatable: false,
    actions,
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "Menu Title",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Items",
          field: "items",
          align: "right",
          render: (value) => value.length,
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

  return (
    <>
      <List {...props} />
      <CreateMenu params={params} setParams={setParams} />
    </>
  );
};
