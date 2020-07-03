import React from "react";

import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetVoucher } from "../queries";
import { DeleteVoucher, UpdateVoucher } from "../mutations";

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

import { SpecificProduct } from "./_components";

const getDefaultValues = (voucher) => ({
  type: voucher.type,
  code: voucher.code,
  usageLimit: voucher.usageLimit,

  applyOncePerOrder: voucher.applyOncePerOrder,
  applyOncePerCustomer: voucher.applyOncePerCustomer,

  discountType: voucher.discountType,
  discountValue: voucher.discountValue,

  minSpentAmount: voucher.minSpentAmount,
  minCheckoutItemsQuantity: voucher.minCheckoutItemsQuantity,

  startDate: dayjs(voucher.startDate).format("YYYY-MM-DD"),
  endDate: voucher.endDate ? dayjs(voucher.endDate).format("YYYY-MM-DD") : "",
  startHour: dayjs(voucher.startDate).format("HH:mm"),
  endHour: voucher.endDate ? dayjs(voucher.endDate).format("HH:mm") : "",
});
const Base = ({ voucher }) => {
  const [update] = useMutation(UpdateVoucher);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteVoucher,
    id: voucher.id,
    name: voucher.code,
    field: "voucherDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(voucher),
    resolver: yupResolver(schema),
  });
  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    delete data["code"];
    const result = await update({ variables: { id: voucher.id, input: getOptimizeData(data) } });
    if (result === undefined) return;

    const {
      data: {
        voucherUpdate: { voucher: updatedVoucher, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Voucher ${data.code} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedVoucher));
    }
  };

  return (
    <>
      <Header title={`Update ${voucher.code}`} />
      <ColGrid>
        <RowGrid>
          <GeneralInformation {...methods} />
          <VoucherType {...methods} />
          {voucher.type === "SPECIFIC_PRODUCT" && <SpecificProduct voucher={voucher} />}
          <Value {...methods} />
          <MinimumRequirements {...methods} voucher={voucher} />
          <UsageLimit {...methods} voucher={voucher} />
          <ActiveDates {...methods} />
        </RowGrid>
        <Summary {...methods} />
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
    <QueryWrapper query={GetVoucher} id={id} fieldName="voucher">
      {(data) => <Base voucher={data.voucher} />}
    </QueryWrapper>
  );
};
