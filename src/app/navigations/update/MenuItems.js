import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";
import { useMutation, useQS } from "@/utils/hooks";

import { Card } from "@/components/Template";

import { DELETE_MENU_ITEM, MOVE_MENU_ITEM } from "@/graphql/mutations/navigations";

import { ACTION as EDIT_ITEM, EditItem } from "./EditItem";
import { ACTION as ADD_ITEM, AddItem } from "./AddItem";
import { computeTree } from "./tree";
import { ItemList } from "./components/ItemList";
import { unknownTypeError } from "./components/tree";

const useStyles = makeStyles(
  (theme) => ({
    buttonRoot: {
      padding: theme.spacing(1),
      marginLeft: "auto",
    },
  }),
  {
    name: "NavigationMenuItems",
  }
);

export const MenuItems = (props) => {
  const { menu } = props;

  const [treeOperations, setTreeOperations] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const [params, setParams] = useQS({ action: undefined, id: undefined });
  const [moveItem, { loading: moveLoading }] = useMutation(MOVE_MENU_ITEM);
  const [deleteItem, { loading: deleteLoading }] = useMutation(DELETE_MENU_ITEM);

  const handleClose = () => {
    setParams({ action: undefined });
  };

  const handleItemClick = (id, type) => {
    switch (type) {
      case "category":
        navigate(`/categories/${id}`);
        break;

      case "collection":
        navigate(`/collections/${id}`);
        break;

      case "page":
        navigate(`/configuration/pages/${id}`);
        break;

      case "url":
        window.open(id, "blank");
        break;

      default:
        throw unknownTypeError;
    }
  };

  const handleItemEdit = (id) => {
    setParams({ action: EDIT_ITEM, id });
  };

  const handleTreeChange = (operation) => {
    if (!!operation) {
      setTreeOperations([operation]);
      if (operation.type === "move") {
        moveItem({
          variables: {
            id: operation.id,
            parentId: operation.parentId,
            sortOrder: operation.sortOrder,
          },
        });
      } else if (operation.type === "remove") {
        setTreeOperations([]);
        deleteItem({
          variables: {
            id: operation.id,
          },
        });
      }
    }
  };

  return (
    <Card title="Menu Items" useDense>
      <ItemList
        loading={moveLoading || deleteLoading}
        items={maybe(() => computeTree(menu.items, [...treeOperations]))}
        onItemClick={handleItemClick}
        onItemEdit={handleItemEdit}
        onChange={handleTreeChange}
      />
      <div className={classes.buttonRoot}>
        <Button color="primary" onClick={() => setParams({ action: ADD_ITEM })}>
          Add New Item
        </Button>
      </div>
      {params.action === ADD_ITEM && <AddItem {...props} params={params} onClose={handleClose} />}
      {params.action === EDIT_ITEM && (
        <EditItem {...props} params={params} onClose={handleClose} />
      )}
    </Card>
  );
};
