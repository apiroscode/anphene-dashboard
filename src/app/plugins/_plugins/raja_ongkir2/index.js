import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";
import { Divider, Typography } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { RowGrid } from "@/components/RowGrid";

import { UpdatePlugin } from "../../mutations";

import { PluginInfo } from "../_form";
import { Couriers, PluginSettings } from "./_form";

const schema = yup.object().shape({
  apiKey: yup.string().required(),
});

const getDefaultValues = (plugin) => {
  const { configuration } = plugin;
  return {
    active: plugin.active,
    apiKey: configuration.find((config) => config.name === "api_key").value,
    courier: JSON.parse(configuration.find((config) => config.name === "courier").value),
    fetchShippingCost:
      configuration.find((config) => config.name === "fetch_shipping_cost").value === "true",
  };
};

export const RajaOngkir = ({ plugin }) => {
  const [update] = useMutation(UpdatePlugin);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: getDefaultValues(plugin),
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const variables = {
      id: plugin.id,
      input: {
        active: data.active,
        configuration: [
          {
            name: "api_key",
            value: data.apiKey,
          },
          {
            name: "fetch_shipping_cost",
            value: data.fetchShippingCost,
          },
          {
            name: "courier",
            value: JSON.stringify(data.courier),
          },
        ],
      },
    };
    const result = await update({ variables });
    if (result === undefined) return;

    const {
      data: {
        pluginUpdate: { plugin: updatedPlugin, errors },
      },
    } = result;
    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Plugin ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedPlugin));
    }
  };

  return (
    <>
      <RowGrid>
        <ColGrid reverse>
          <div>
            <Typography variant="h6">Plugin Information and Status</Typography>
            <Typography variant="body1">
              These are general information about your store. They define what is the URL of your
              store and what is shown in browsers taskbar.
            </Typography>
          </div>
          <PluginInfo {...methods} plugin={plugin} />
        </ColGrid>
        <Divider />
        <ColGrid reverse>
          <div>
            <Typography variant="h6">Plugin Settings</Typography>
            <Typography variant="body1">
              This address will be used to generate invoices and calculate shipping rates. Email
              address you provide here will be used as a contact address for your customers.
            </Typography>
          </div>
          <RowGrid>
            <PluginSettings {...methods} plugin={plugin} />
            <Couriers {...methods} plugin={plugin} />
          </RowGrid>
        </ColGrid>
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
