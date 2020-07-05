import React from "react";

import { Button } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import {
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  RemoveCircle as RemoveCircleIcon,
} from "@material-ui/icons";

import { useMutation, useQS } from "@/utils/hooks";

import { List } from "@/components/List";

import { GetMenus } from "../queries";
import { BulkDeleteMenu } from "../mutations";

import { ACTION, CreateMenu } from "./_components/CreateMenu";

export default () => {
  const [params, setParams] = useQS({ action: undefined });
  const [bulkDelete, { loading }] = useMutation(BulkDeleteMenu);

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
    query: GetMenus,
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
          label: "Main Navigation",
          field: "isMainNavigation",
          align: "center",
          render: (value) =>
            value ? (
              <CheckCircleIcon style={{ color: green[500] }} />
            ) : (
              <RemoveCircleIcon style={{ color: red[500] }} />
            ),
        },
        {
          label: "Secondary Navigation",
          field: "isSecondaryNavigation",
          align: "center",
          render: (value) =>
            value ? (
              <CheckCircleIcon style={{ color: green[500] }} />
            ) : (
              <RemoveCircleIcon style={{ color: red[500] }} />
            ),
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
