import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { UPDATE_MENU_ITEM } from "@/graphql/mutations/navigations";

import { getInitialDisplayValue } from "./utils";
import { getItemId, getItemType } from "./components/tree";
import { MenuItemDialog } from "./components/MenuItemDialog";

const schema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string().required(),
});

export const ACTION = "edit-item";
export const EditItem = (props) => {
  const { onClose, menu, params } = props;
  const { action, id } = params;
  const item = menu.items.find((item) => item.id === id);

  const [update] = useMutation(UPDATE_MENU_ITEM);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      name: item.name,
      value: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!data.value) {
      data.value = `${getItemType(item)}:${getItemId(item)}`;
    }
    const [type, ...idParts] = data.value.split(":");
    const inputData = {
      name: data.name,
      [type]: idParts.join(":"),
    };

    const result = await update({ variables: { id, input: inputData } });
    if (result === undefined) return;

    const {
      data: {
        menuItemUpdate: { errors },
      },
    } = result;
    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      onClose();
    }
  };

  return (
    <MenuItemDialog
      {...props}
      {...methods}
      open={action === ACTION}
      onSubmit={onSubmit}
      initialDisplayValue={getInitialDisplayValue(item)}
    />
  );
};
