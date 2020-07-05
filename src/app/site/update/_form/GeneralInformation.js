import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { Card } from "@/components/Card";

export const GeneralInformation = (props) => {
  const { control, errors } = props;

  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="shopDomainInput.name"
        label="Name of your store"
        fullWidth
        error={!!errors.shopDomainInput?.name}
        helperText={errors.shopDomainInput?.name?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="shopDomainInput.domain"
        label="URL of your online store"
        fullWidth
        error={!!errors.shopDomainInput?.domain}
        helperText={errors.shopDomainInput?.domain?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="shopSettingsInput.description"
        label="Store Description"
        fullWidth
        error={!!errors.shopSettingsInput?.description}
        helperText={
          !!errors.shopSettingsInput?.description
            ? errors.shopSettingsInput?.description?.message
            : "Store description is shown on taskbar after your store name"
        }
      />
    </Card>
  );
};
