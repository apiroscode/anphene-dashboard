import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CreateMenuItem } from "../../../mutations";

import { MenuItemDialog } from "./_components/MenuItemDialog";

const schema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string().required(),
});

export const ACTION = "add-item";
export const AddItem = (props) => {
  const { onClose, menu, params } = props;
  const [create] = useMutation(CreateMenuItem);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      name: "",
      value: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const [type, ...idParts] = data.value.split(":");

    const inputData = {
      menu: menu.id,
      name: data.name,
      [type]: idParts.join(":"),
    };

    const result = await create({ variables: { input: inputData } });
    if (result === undefined) return;

    const {
      data: {
        menuItemCreate: { errors },
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
    <MenuItemDialog {...props} {...methods} open={params.action === ACTION} onSubmit={onSubmit} />
  );
};
