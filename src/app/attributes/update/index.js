import React from "react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { GET_ATTRIBUTE } from "@/graphql/queries/attributes";
import { DELETE_ATTRIBUTE, UPDATE_ATTRIBUTE } from "@/graphql/mutations/attributes";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormGeneralInformation, FormProperties, schema } from "../components";
import { FormValues } from "./FormValues";

const Base = ({ attribute }) => {
  const [update] = useMutation(UPDATE_ATTRIBUTE);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_ATTRIBUTE,
    id: attribute.id,
    name: attribute.name,
    field: "attributeDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: attribute.name,
      slug: attribute.slug,
      valueRequired: attribute.valueRequired,
      visibleInStorefront: attribute.visibleInStorefront,
      filterableInStorefront: attribute.filterableInStorefront,
      filterableInDashboard: attribute.filterableInDashboard,
      storefrontSearchPosition: attribute.storefrontSearchPosition,
      availableInGrid: attribute.availableInGrid,
      inputType: attribute.inputType,
    },
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
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Attribute ${updatedAttribute.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: updatedAttribute.name,
        slug: updatedAttribute.slug,
        valueRequired: updatedAttribute.valueRequired,
        visibleInStorefront: updatedAttribute.visibleInStorefront,
        filterableInStorefront: updatedAttribute.filterableInStorefront,
        filterableInDashboard: updatedAttribute.filterableInDashboard,
        storefrontSearchPosition: updatedAttribute.storefrontSearchPosition,
        availableInGrid: updatedAttribute.availableInGrid,
        inputType: updatedAttribute.inputType,
      });
    }
  };

  return (
    <>
      <Header title={`Update ${attribute.name}`} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation control={control} errors={errors} watch={watch} />
          <FormValues attributeValues={attribute.values} attributeId={attribute.id} />
        </RowGrid>
        <FormProperties control={control} errors={errors} />
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
    <QueryWrapper query={GET_ATTRIBUTE} id={id} fieldName="attribute">
      {(data) => <Base attribute={data?.attribute} />}
    </QueryWrapper>
  );
};
