import React, { useEffect, useState } from "react";

import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";
import { Tab, Tabs } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { GET_CATEGORY } from "@/graphql/queries/categories";
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "@/graphql/mutations/categories";

import { getErrors, SaveButton, SeoForm } from "@/components/form";
import { Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormGeneralInformation, schema } from "../components";
import { BackgroundImage } from "./BackgroundImage";
import { SubCategories } from "./SubCategories";

const Base = ({ category }) => {
  const [update] = useMutation(UPDATE_CATEGORY);
  const { enqueueSnackbar } = useSnackbar();
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (category.parent) {
      setHeaderBackLabel({
        label: category.parent.name,
        link: `/categories/${category.parent.id}`,
      });
    }
    return () => setHeaderBackLabel(undefined);
  }, [category.parent, setHeaderBackLabel]);

  const deleteProps = {
    mutation: DELETE_CATEGORY,
    id: category.id,
    name: category.name,
    field: "categoryDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      seo: {
        title: category.seoTitle,
        description: category.seoDescription,
      },
      backgroundImageAlt: category?.backgroundImage?.alt || "",
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
    const result = await update({ variables: { id: category.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        categoryUpdate: { category: updatedCategory, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Category ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: updatedCategory.name,
        description: updatedCategory.description,
        seo: {
          title: updatedCategory.seoTitle,
          description: updatedCategory.seoDescription,
        },
        backgroundImageAlt: updatedCategory?.backgroundImage?.alt,
      });
    }
  };

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <>
      <Header title={`${category.name}`} />
      <RowGrid>
        <FormGeneralInformation {...methods} category={category} />
        <BackgroundImage
          {...methods}
          category={category}
          update={update}
          enqueueSnackbar={enqueueSnackbar}
        />
        <SeoForm {...methods} />
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          value={tabValue}
          onChange={handleTabChange}
        >
          <Tab label="Subcategories" />
          <Tab label="All Products" />
        </Tabs>
        {tabValue === 0 && <SubCategories category={category} />}
        {/*TODO: after products finish*/}
        {tabValue === 1 && <div>ganteng</div>}
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
    <QueryWrapper query={GET_CATEGORY} vars={{ id, first: 20 }} fieldName="category">
      {(data) => <Base category={data.category} />}
    </QueryWrapper>
  );
};
