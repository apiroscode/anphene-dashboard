import React from "react";

import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { GET_SALE } from "@/graphql/queries/sales";
import { DELETE_SALE, UPDATE_SALE } from "@/graphql/mutations/sales";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { getOptimizeDate } from "@/app/utils";

import {
  FormActiveDates,
  FormDiscountType,
  FormGeneralInformation,
  FormValue,
  schema,
  Summary,
} from "../components";

import { SpecificProduct } from "./SpecificProduct";

const Base = ({ sale }) => {
  const [update] = useMutation(UPDATE_SALE);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_SALE,
    id: sale.id,
    name: sale.name,
    field: "saleDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: sale.name,
      type: sale.type,
      value: sale.value,
      startDate: dayjs(sale.startDate).format("YYYY-MM-DD"),
      endDate: sale.endDate ? dayjs(sale.endDate).format("YYYY-MM-DD") : "",
      startHour: dayjs(sale.startDate).format("HH:mm"),
      endHour: sale.endDate ? dayjs(sale.endDate).format("HH:mm") : "",
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
    const result = await update({ variables: { id: sale.id, input: getOptimizeDate(data) } });
    if (result === undefined) return;

    const {
      data: {
        saleUpdate: { sale: updatedSale, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Sale ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: updatedSale.name,
        type: updatedSale.type,
        value: updatedSale.value,
        startDate: dayjs(updatedSale.startDate).format("YYYY-MM-DD"),
        endDate: updatedSale.endDate ? dayjs(updatedSale.endDate).format("YYYY-MM-DD") : "",
        startHour: dayjs(updatedSale.startDate).format("HH:mm"),
        endHour: updatedSale.endDate ? dayjs(updatedSale.endDate).format("HH:mm") : "",
      });
    }
  };

  return (
    <>
      <Header title={sale.name} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} />
          <FormDiscountType {...methods} />
          <FormValue {...methods} />
          <SpecificProduct sale={sale} />
          <FormActiveDates {...methods} sale={sale} />
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
    <QueryWrapper query={GET_SALE} id={id} fieldName="sale">
      {(data) => <Base sale={data.sale} />}
    </QueryWrapper>
  );
};
