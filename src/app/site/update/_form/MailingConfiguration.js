import React from "react";

import { Controller } from "react-hook-form";

import { TextField, Typography, Divider } from "@material-ui/core";

import { Card } from "@/components/Card";

export const MailingConfiguration = (props) => {
  const { control, errors } = props;

  return (
    <Card title="Mailing Configuration" useMargin>
      <Typography variant="body2">
        Configurate your email address from which all automatic emails will be sent to your
        customers.
      </Typography>
      <Controller
        as={TextField}
        control={control}
        name="shopSettingsInput.defaultMailSenderAddress"
        label="Mailing email address"
        fullWidth
        error={!!errors.shopSettingsInput?.defaultMailSenderAddress}
        helperText={errors.shopSettingsInput?.defaultMailSenderAddress?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="shopSettingsInput.defaultMailSenderName"
        label="Mailing email sender"
        fullWidth
        error={!!errors.shopSettingsInput?.defaultMailSenderName}
        helperText={
          !!errors.shopSettingsInput?.defaultMailSenderName
            ? errors.shopSettingsInput?.defaultMailSenderName?.message
            : 'This will be visible as "from" name'
        }
      />
      <Divider />
      <Controller
        as={TextField}
        control={control}
        name="shopSettingsInput.customerSetPasswordUrl"
        label="Customer password reset URL"
        fullWidth
        error={!!errors.shopSettingsInput?.customerSetPasswordUrl}
        helperText={
          !!errors.shopSettingsInput?.customerSetPasswordUrl
            ? errors.shopSettingsInput?.customerSetPasswordUrl?.message
            : "This URL will be used as a main URL for password resets. It will be sent via email."
        }
      />
    </Card>
  );
};
