import React from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as yup from "yup";

import { Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetMenu } from "../queries";
import { DeleteMenu, UpdateMenu } from "../mutations";

import { GeneralInformation } from "./_form/GeneralInformation";
import { MenuItems } from "./MenuItems";
import { SetNavigation } from "./SetNavigation";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const Base = (props) => {
  const { menu, refetch } = props;
  const [update] = useMutation(UpdateMenu);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteMenu,
    id: menu.id,
    name: menu.name,
    field: "menuDelete",
  };

  const methods = useForm({
    defaultValues: { name: menu.name },
    resolver: yupResolver(schema),
  });

  const {
    setError,
    reset,
    formState: { isDirty, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({
      variables: { id: menu.id, input: data },
    });
    if (result === undefined) return;

    const {
      data: {
        menuUpdate: { menu: updatedMenu, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Menu ${updatedMenu.name} successfully updated.`, {
        variant: "success",
      });
      reset({ name: updatedMenu.name });
    }
  };

  return (
    <>
      <ColGrid reverse>
        <RowGrid>
          <div>
            <Typography variant="h5">Navigation</Typography>
            <Typography variant="body1">
              Creating the navigation structure is done by dragging and dropping. Simply create a
              new menu item and then drag it into its destined place. You can move items inside one
              another to create a tree structure and drag items up and down to create a hierarchy
            </Typography>
          </div>
          <SetNavigation menu={menu} refetch={refetch} />
        </RowGrid>
        <RowGrid>
          <GeneralInformation {...methods} />
          <MenuItems {...props} />
        </RowGrid>
      </ColGrid>
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
      />
    </>
  );
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper query={GetMenu} id={id} fieldName="menu">
      {(data, { refetch }) => (
        <Base
          menu={data.menu}
          collections={data.collections.edges}
          categories={data.categories.edges}
          pages={data.pages.edges}
          refetch={refetch}
        />
      )}
    </QueryWrapper>
  );
};
