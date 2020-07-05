import React, { useEffect, useState } from "react";

import isUrl from "is-url";
import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { AutocompleteSelectMenu } from "@/components/AutoCompleteSelectMenu";
import { getMenuItemByValue } from "@/components/AutoCompleteSelectMenu/utils";
import { Dialog } from "@/components/Dialog";
import { RowGrid } from "@/components/RowGrid";

function getMenuItemData(value) {
  const [type, ...idParts] = value.split(":");
  return {
    id: idParts.join(":"),
    type: type,
  };
}

function getDisplayValue(menu, value) {
  const menuItemData = getMenuItemData(value);
  if (menuItemData.type === "url") {
    return menuItemData.id;
  }
  return getMenuItemByValue(menu, value).label.toString();
}

export const MenuItemDialog = (props) => {
  const {
    categories,
    collections,
    pages,
    initialDisplayValue,
    open,
    onClose,
    onSubmit,
    handleSubmit,
    errors,
    control,
    register,
    unregister,
    setValue,
    formState: { isDirty, isSubmitting },
  } = props;
  const [displayValue, setDisplayValue] = React.useState(initialDisplayValue || "");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    register("value");
    return () => {
      unregister("value");
    };
  }, [register, unregister]);

  let options = [];
  if (categories.length > 0) {
    options = [
      ...options,
      {
        children: categories.map((category) => ({
          children: [],
          data: {},
          label: `${"-".repeat(category.node?.level)}${category?.node?.name}`,
          value: "category:" + category.node.id,
        })),
        data: {},
        label: "Categories",
      },
    ];
  }

  if (collections.length > 0) {
    options = [
      ...options,
      {
        children: collections.map((collection) => ({
          children: [],
          data: {},
          label: collection.node.name,
          value: "collection:" + collection.node.id,
        })),
        data: {},
        label: "Colletions",
      },
    ];
  }

  if (pages.length > 0) {
    options = [
      ...options,
      {
        children: pages.map((page) => ({
          children: [],
          data: {},
          label: page.node.title,
          value: "page:" + page.node.id,
        })),
        data: {},
        label: "Pages",
      },
    ];
  }

  if (url) {
    options = [
      {
        children: [],
        data: {},
        label: (
          <span>
            Link to <strong>{url}</strong>
          </span>
        ),
        value: "url:" + url,
      },
    ];
  }

  const handleQueryChange = (query) => {
    if (isUrl(query)) {
      setUrl(query);
    } else if (isUrl("http://" + query)) {
      setUrl("http://" + query);
    } else if (url) {
      setUrl(undefined);
    }
  };
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setValue("value", value, { shouldValidate: true, shouldDirty: true });
    setDisplayValue(getDisplayValue(options, value));
  };

  return (
    <Dialog
      title={initialDisplayValue ? "Edit Menu" : "Create Menu"}
      open={open}
      handleOk={handleSubmit(onSubmit)}
      handleClose={onClose}
      okText={initialDisplayValue ? "EDIT" : "Create"}
      okProps={{
        disabled: !isDirty,
        loading: isSubmitting,
      }}
      dialogProps={{
        fullWidth: true,
        PaperProps: {
          style: { overflowY: "visible" },
        },
      }}
      dialogContentProps={{
        style: { overflowY: "visible", overflow: "unset" },
      }}
    >
      <RowGrid>
        <Controller
          as={TextField}
          control={control}
          name="name"
          label="Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <AutocompleteSelectMenu
          disabled={isSubmitting}
          onChange={handleSelectChange}
          name="id"
          label="Link"
          displayValue={displayValue}
          loading={isSubmitting}
          options={options}
          placeholder="Start typing to begin search..."
          onInputChange={handleQueryChange}
          error={!!errors.value}
          helperText={errors.value?.message}
        />
      </RowGrid>
    </Dialog>
  );
};
