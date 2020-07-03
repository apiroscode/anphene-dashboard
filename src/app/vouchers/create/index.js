import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";
import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateVoucher } from "../mutations";

import { ActiveDates } from "../../sales/_form";
import {
  GeneralInformation,
  getOptimizeData,
  MinimumRequirements,
  schema,
  Summary,
  UsageLimit,
  Value,
  VoucherType,
} from "../_form";

export default () => {
  const [create] = useMutation(CreateVoucher);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "ENTIRE_ORDER",
      code: "",
      usageLimit: 0,

      applyOncePerOrder: false,
      applyOncePerCustomer: false,

      discountType: "FIXED",
      discountValue: 0,

      minSpentAmount: 0,
      minCheckoutItemsQuantity: 0,

      startDate: "",
      endDate: "",
      startHour: "",
      endHour: "",
    },
  });
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;
  const onSubmit = async (data) => {
    const result = await create({ variables: { input: getOptimizeData(data) } });
    if (result === undefined) return;

    const {
      data: {
        voucherCreate: { voucher, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Voucher ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${voucher.id}`);
    }
  };

  return (
    <>
      <Header title="Create sale" />
      <ColGrid>
        <RowGrid>
          <GeneralInformation {...methods} isCreate />
          <VoucherType {...methods} isCreate />
          <Value {...methods} />
          <MinimumRequirements {...methods} />
          <UsageLimit {...methods} />
          <ActiveDates {...methods} />
        </RowGrid>
        <Summary {...methods} />
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
