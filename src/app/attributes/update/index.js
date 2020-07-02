import React from "react";
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

import { GetAttribute } from "../queries";
import { DeleteAttribute, UpdateAttribute } from "../mutations";

import { GeneralInformation, Properties, schema } from "../_form";
import { FormValues } from "./FormValues";

const getDefaultValues = (attribute) => ({
  name: attribute.name,
  slug: attribute.slug,
  valueRequired: attribute.valueRequired,
  visibleInStorefront: attribute.visibleInStorefront,
  filterableInStorefront: attribute.filterableInStorefront,
  filterableInDashboard: attribute.filterableInDashboard,
  storefrontSearchPosition: attribute.storefrontSearchPosition,
  availableInGrid: attribute.availableInGrid,
  inputType: attribute.inputType,
});

const Base = ({ attribute }) => {
  const [update] = useMutation(UpdateAttribute);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteAttribute,
    id: attribute.id,
    name: attribute.name,
    field: "attributeDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(attribute),
    resolver: yupResolver(schema),
  });

  const {
    control,
    errors,
    setError,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({
      variables: {
        id: attribute.id,
        input: { ...data, inputType: undefined },
      },
    });
    if (result === undefined) return;

    const {
      data: {
        attributeUpdate: { attribute: updatedAttribute, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Attribute ${updatedAttribute.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedAttribute));
    }
  };

  return (
    <>
      <Header title={`Update ${attribute.name}`} />
      <ColGrid>
        <RowGrid>
          <GeneralInformation control={control} errors={errors} watch={watch} />
          <FormValues attribute={attribute} />
        </RowGrid>
        <Properties control={control} errors={errors} />
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
    <QueryWrapper query={GetAttribute} id={id} fieldName="attribute">
      {(data) => <Base attribute={data?.attribute} />}
    </QueryWrapper>
  );
};
