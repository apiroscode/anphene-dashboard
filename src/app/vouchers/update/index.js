import React from "react";

import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { GET_VOUCHER } from "@/graphql/queries/vouchers";
import { DELETE_VOUCHER, UPDATE_VOUCHER } from "@/graphql/mutations/vouchers";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormActiveDates } from "@/app/sales/components";

import {
  FormGeneralInformation,
  FormMinimumRequirements,
  FormUsageLimit,
  FormValue,
  FormVoucherType,
  getOptimizeData,
  schema,
  Summary,
} from "../components";

import { SpecificProduct } from "./SpecificProduct";

const Base = ({ voucher }) => {
  const [update] = useMutation(UPDATE_VOUCHER);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_VOUCHER,
    id: voucher.id,
    name: voucher.code,
    field: "voucherDelete",
  };

  const methods = useForm({
    defaultValues: {
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
    },
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
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Voucher ${data.code} successfully updated.`, {
        variant: "success",
      });
      reset({
        type: updatedVoucher.type,
        code: updatedVoucher.code,
        usageLimit: updatedVoucher.usageLimit,

        applyOncePerOrder: updatedVoucher.applyOncePerOrder,
        applyOncePerCustomer: updatedVoucher.applyOncePerCustomer,

        discountType: updatedVoucher.discountType,
        discountValue: updatedVoucher.discountValue,

        minSpentAmount: updatedVoucher.minSpentAmount,
        minCheckoutItemsQuantity: updatedVoucher.minCheckoutItemsQuantity,

        startDate: dayjs(updatedVoucher.startDate).format("YYYY-MM-DD"),
        endDate: updatedVoucher.endDate ? dayjs(updatedVoucher.endDate).format("YYYY-MM-DD") : "",
        startHour: dayjs(updatedVoucher.startDate).format("HH:mm"),
        endHour: updatedVoucher.endDate ? dayjs(updatedVoucher.endDate).format("HH:mm") : "",
      });
    }
  };

  return (
    <>
      <Header title={`Update ${voucher.code}`} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} />
          <FormVoucherType {...methods} />
          {voucher.type === "SPECIFIC_PRODUCT" && <SpecificProduct voucher={voucher} />}
          <FormValue {...methods} />
          <FormMinimumRequirements {...methods} voucher={voucher} />
          <FormUsageLimit {...methods} voucher={voucher} />
          <FormActiveDates {...methods} />
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
    <QueryWrapper query={GET_VOUCHER} id={id} fieldName="voucher">
      {(data) => <Base voucher={data.voucher} />}
    </QueryWrapper>
  );
};
