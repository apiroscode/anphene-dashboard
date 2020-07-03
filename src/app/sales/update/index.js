import React from "react";

import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { getOptimizeDate } from "@/utils";
import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";
import { QueryWrapper } from "@/components/QueryWrapper";

import { ActiveDates, DiscountType, GeneralInformation, schema, Summary, Value } from "../_form";

import { GetSale } from "../queries";
import { DeleteSale, UpdateSale } from "../mutations";
import { SpecificProduct } from "./_components/SpecificProduct";

const getDefaultValues = (sale) => ({
  name: sale.name,
  type: sale.type,
  value: sale.value,
  startDate: dayjs(sale.startDate).format("YYYY-MM-DD"),
  endDate: sale.endDate ? dayjs(sale.endDate).format("YYYY-MM-DD") : "",
  startHour: dayjs(sale.startDate).format("HH:mm"),
  endHour: sale.endDate ? dayjs(sale.endDate).format("HH:mm") : "",
});

const Base = ({ sale }) => {
  const [update] = useMutation(UpdateSale);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteSale,
    id: sale.id,
    name: sale.name,
    field: "saleDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(sale),
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
      reset(getDefaultValues(updatedSale));
    }
  };

  return (
    <>
      <Header title={sale.name} />
      <ColGrid>
        <RowGrid>
          <GeneralInformation {...methods} />
          <DiscountType {...methods} />
          <Value {...methods} />
          <SpecificProduct sale={sale} />
          <ActiveDates {...methods} sale={sale} />
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
    <QueryWrapper query={GetSale} id={id} fieldName="sale">
      {(data) => <Base sale={data.sale} />}
    </QueryWrapper>
  );
};
