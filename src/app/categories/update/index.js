import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";
import { Tab } from "@material-ui/core";

import { useMutation, useQS } from "@/utils/hooks";

import { getErrors, SaveButton, Seo } from "@/components/_form";
import { Tabs } from "@/components/Tabs";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { SimpleListProduct } from "../../_components/SimpleListProduct";

import { GetCategory } from "../queries";
import { DeleteCategory, UpdateCategory } from "../mutations";

import { GeneralInformation, schema } from "../_form";
import { BackgroundImage, SubCategories } from "./_components";

export const getDefaultValues = (category) => ({
  name: category.name,
  description: category.description,
  seo: {
    title: category.seoTitle,
    description: category.seoDescription,
  },
  backgroundImageAlt: category?.backgroundImage?.alt || "",
});

const Base = ({ category }) => {
  const [update] = useMutation(UpdateCategory);
  const { enqueueSnackbar } = useSnackbar();
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);
  const [params, setParams] = useQS({ activeTab: 0 });

  const deleteProps = {
    mutation: DeleteCategory,
    id: category.id,
    name: category.name,
    field: "categoryDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(category),
    resolver: yupResolver(schema),
  });

  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  useEffect(() => {
    if (category.parent) {
      setHeaderBackLabel({
        label: category.parent.name,
        link: `/categories/${category.parent.id}`,
      });
    }
    return () => setHeaderBackLabel(undefined);
  }, [category.parent, setHeaderBackLabel]);

  useEffect(() => {
    reset(getDefaultValues(category));
  }, [category, reset]);

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: category.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        categoryUpdate: { category: updatedCategory, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Category ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedCategory));
    }
  };

  const handleTabChange = (_, newValue) => {
    setParams({ activeTab: newValue });
  };

  return (
    <>
      <Header title={`${category.name}`} />
      <RowGrid>
        <GeneralInformation {...methods} category={category} />
        <BackgroundImage
          {...methods}
          id={category.id}
          image={category.backgroundImage}
          update={update}
          enqueueSnackbar={enqueueSnackbar}
        />
        <Seo {...methods} />
        <Tabs value={params.activeTab} onChange={handleTabChange}>
          <Tab label="Subcategories" />
          <Tab label="All Products" />
        </Tabs>
        {params.activeTab === 0 && <SubCategories category={category} />}
        {params.activeTab === 1 && (
          <SimpleListProduct title="All Products" vars={{ categories: [category.id] }} />
        )}
      </RowGrid>
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
    <QueryWrapper query={GetCategory} vars={{ id, first: 20 }} fieldName="category">
      {(data) => <Base category={data.category} />}
    </QueryWrapper>
  );
};
