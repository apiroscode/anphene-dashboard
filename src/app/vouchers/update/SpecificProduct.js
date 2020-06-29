import React, { useState } from "react";

import { Tab } from "@material-ui/core";

import { useQS } from "@/utils/hooks";

import { Tabs } from "@/components/Tabs";

import {
  AssignCategories,
  AssignCollections,
  AssignProducts,
  CategorySimpleList,
  CollectionSimpleList,
  ProductSimpleList,
} from "@/app/components";

import {
  useAssignCategoriesProps,
  useAssignPCollectionsProps,
  useAssignProductsProps,
  useCategorySimpleListProps,
  useCollectionSimpleListProps,
  useProductSimpleListProps,
} from "./utils";

export const SpecificProduct = (props) => {
  const { voucher } = props;

  const [params, setParams] = useQS({ activeTab: 0, action: undefined });
  const [productListProps, setProductListProps] = useState();
  const assignProductsProps = useAssignProductsProps({
    voucher,
    listProps: productListProps,
    params,
    setParams,
  });
  const productSimpleListProps = useProductSimpleListProps({
    voucher,
    setListProps: setProductListProps,
    setParams,
  });

  const [categoryListProps, setCategoryListProps] = useState();
  const assignCategoriesProps = useAssignCategoriesProps({
    voucher,
    listProps: categoryListProps,
    params,
    setParams,
  });
  const categorySimpleListProps = useCategorySimpleListProps({
    voucher,
    setListProps: setCategoryListProps,
    setParams,
  });

  const [collectionListProps, setCollectionListProps] = useState();
  const assignCollectionsProps = useAssignPCollectionsProps({
    voucher,
    listProps: collectionListProps,
    params,
    setParams,
  });
  const collectionSimpleListProps = useCollectionSimpleListProps({
    voucher,
    setListProps: setCollectionListProps,
    setParams,
  });
  return (
    <>
      <Tabs
        value={params.activeTab}
        onChange={(_, newValue) => setParams({ activeTab: newValue })}
      >
        <Tab label={`Categories (${voucher.categories.totalCount})`} />
        <Tab label={`Collections (${voucher.collections.totalCount})`} />
        <Tab label={`Products (${voucher.products.totalCount})`} />
      </Tabs>
      {params.activeTab === 0 && <CategorySimpleList {...categorySimpleListProps} />}
      {params.activeTab === 1 && <CollectionSimpleList {...collectionSimpleListProps} />}
      {params.activeTab === 2 && <ProductSimpleList {...productSimpleListProps} />}
      <AssignProducts {...assignProductsProps} />
      <AssignCategories {...assignCategoriesProps} />
      <AssignCollections {...assignCollectionsProps} />
    </>
  );
};
