import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { SaveButton } from "@/components/_form";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateCustomer } from "../mutations";

import { CustomerOverview, Notes, PrimaryAddress } from "./_form";

const schema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  note: yup.string(),
  defaultShippingAddress: yup.object().shape({
    name: yup.string().required("This field is required"),
    phone: yup.string().required("This field is required"),
    streetAddress: yup.string().required("This field is required"),
    postalCode: yup.string(),
    subDistrict: yup.string().required("This field is required"),
  }),
});

export default () => {
  const [create] = useMutation(CreateCustomer);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: "",
      note: "",
      defaultShippingAddress: {
        name: "",
        phone: "",
        streetAddress: "",
        postalCode: "",
        subDistrict: "",
      },
    },
    resolver: yupResolver(schema),
  });

  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        customerCreate: { user, errors },
      },
    } = result;

    if (errors.length > 0) {
      const defaultShippingAddressKeys = [
        "name",
        "phone",
        "streetAddress",
        "postalCode",
        "subDistrict",
      ];
      errors.forEach((item) => {
        const field = defaultShippingAddressKeys.includes(item.field)
          ? `defaultShippingAddress.${item.field}`
          : item.field;
        setError(field, { type: null, message: item.message });
      });
    } else {
      enqueueSnackbar(`Customer ${data.email} successfully created.`, {
        variant: "success",
      });
      navigate(`../${user.id}`);
    }
  };

  return (
    <>
      <Header title="Create Customer" />
      <RowGrid>
        <CustomerOverview {...methods} />
        <PrimaryAddress {...methods} />
        <Notes {...methods} />
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
