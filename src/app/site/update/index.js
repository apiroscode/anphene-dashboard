import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";
import { Divider, Typography } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { QueryWrapper } from "@/components/QueryWrapper";
import { ColGrid } from "@/components/ColGrid";
import { RowGrid } from "@/components/RowGrid";
import { SaveButton } from "@/components/_form";

import { SiteSettings } from "../queries";
import { ShopSettingsUpdate } from "../mutations";

import { GeneralInformation, MailingConfiguration, StoreInformation } from "./_form";
import { AuthenticationKeys } from "./AuthenticationKeys";

const schema = yup.object().shape({
  shopDomainInput: yup.object().shape({
    name: yup.string().required("This field is required"),
    domain: yup.string().required("This field is required"),
  }),
  shopSettingsInput: yup.object().shape({
    description: yup.string().required("This field is required"),
    defaultMailSenderName: yup.string().required("This field is required"),
    defaultMailSenderAddress: yup.string().required("This field is required"),
    customerSetPasswordUrl: yup.string().required("This field is required"),
  }),
  addressInput: yup.object().shape({
    name: yup.string().required("This field is required"),
    phone: yup.string().required("This field is required"),
    streetAddress: yup.string().required("This field is required"),
    postalCode: yup.string(),
    subDistrict: yup.string().required("This field is required"),
  }),
});

const getDefaultValues = (shop) => ({
  shopDomainInput: {
    name: shop.name,
    domain: shop.domain?.host || "",
  },
  shopSettingsInput: {
    description: shop.description,
    defaultMailSenderName: shop.defaultMailSenderName,
    defaultMailSenderAddress: shop.defaultMailSenderAddress,
    customerSetPasswordUrl: shop.customerSetPasswordUrl,
  },
  addressInput: {
    name: shop.companyAddress?.name || "",
    phone: shop.companyAddress?.phone || "",
    streetAddress: shop.companyAddress?.streetAddress || "",
    postalCode: shop.companyAddress?.postalCode || "",
    subDistrict: shop.companyAddress?.subDistrict?.id || "",
  },
});

const Base = ({ shop }) => {
  const [update] = useMutation(ShopSettingsUpdate);

  const methods = useForm({
    defaultValues: getDefaultValues(shop),
    resolver: yupResolver(schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    reset(getDefaultValues(shop));
  }, [reset, shop]);

  const onSubmit = async (data) => {
    const result = await update({ variables: data });
    if (result === undefined) return;

    const {
      data: {
        shopSettingsUpdate: { errors: settingErrors },
        shopDomainUpdate: { errors: domainErrors },
        shopAddressUpdate: { errors: addressErrors },
      },
    } = result;
    if (settingErrors || domainErrors || addressErrors) {
      settingErrors.forEach((item) => {
        setError(`shopSettingsInput.${item.field}`, { type: null, message: item.message });
      });
      domainErrors.forEach((item) => {
        setError(`shopDomainInput.${item.field}`, { type: null, message: item.message });
      });
      addressErrors.forEach((item) => {
        setError(`addressInput.${item.field}`, { type: null, message: item.message });
      });
    }
  };
  return (
    <>
      <RowGrid>
        <ColGrid reverse>
          <div>
            <Typography variant="h5">Site Settings</Typography>
            <Typography variant="body2">
              These are general information about your store. They define what is the URL of your
              store and what is shown in browsers task bar.
            </Typography>
          </div>
          <GeneralInformation {...methods} />
        </ColGrid>
        <Divider />
        <ColGrid reverse>
          <div>
            <Typography variant="h5">Mailing Configuration</Typography>
            <Typography variant="body2">
              This where you will find all of the settings determining your stores e-mails. You can
              determine main email address and some of the contents of your emails.
            </Typography>
          </div>
          <MailingConfiguration {...methods} />
        </ColGrid>
        <Divider />
        <ColGrid reverse>
          <div>
            <Typography variant="h5">Company Information</Typography>
            <Typography variant="body2">
              This address will be used to generate invoices and calculate shipping rates.Email
              address you provide here will be used as a contact address for your customers.
            </Typography>
          </div>
          <StoreInformation {...methods} address={shop.companyAddress} />
        </ColGrid>
        <Divider />
        <ColGrid reverse>
          <div>
            <Typography variant="h5">Authentication Methods</Typography>
            <Typography variant="body2">
              Authentication method defines additional ways that customers can log in to your
              e-commerce.
            </Typography>
          </div>
          <AuthenticationKeys authorizationKeys={shop.authorizationKeys} />
        </ColGrid>
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};

export default () => {
  return (
    <QueryWrapper query={SiteSettings} fieldName="shop">
      {(data) => <Base shop={data.shop} />}
    </QueryWrapper>
  );
};
