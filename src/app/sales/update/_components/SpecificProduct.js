import React, { useState } from "react";

import { Tab } from "@material-ui/core";

import { useQS } from "@/utils/hooks";

import { Tabs } from "@/components/Tabs";

import {
  ASSIGN_CATEGORIES,
  ASSIGN_COLLECTIONS,
  ASSIGN_PRODUCTS,
  AssignItem,
} from "../../../_components/AssignItem";
import { useAssignItem, useSimpleListProps } from "../../../_components/_hooks";
import { SimpleListCategory } from "../../../_components/SimpleListCategory";
import { SimpleListCollection } from "../../../_components/SimpleListCollection";
import { SimpleListProduct } from "../../../_components/SimpleListProduct";

import { GetProducts } from "../../../products/queries";
import { GetSimpleCategories } from "../../../categories/queries";
import { GetSimpleCollections } from "../../../collections/queries";

import { AddSaleCatalogues, RemoveSaleCatalogues } from "../../mutations";

export const SpecificProduct = (props) => {
  const { sale } = props;

  const [params, setParams] = useQS({ activeTab: 0, action: undefined });
  const [productListProps, setProductListProps] = useState();
  const assignProductsProps = useAssignItem({
    instance: sale,
    listProps: productListProps,
    params,
    setParams,
    mutation: AddSaleCatalogues,
    refetchQuery: GetProducts,
    queryField: "saleCataloguesAdd",
    querySelector: "products",
    appName: "products",
    vars: "notInSales",
  });
  const productSimpleListProps = useSimpleListProps({
    instance: sale,
    removeMutation: RemoveSaleCatalogues,
    setListProps: setProductListProps,
    setParams,
    assignAction: ASSIGN_PRODUCTS,
    appName: "products",
    selector: "products",
    vars: "sales",
  });

  const [categoryListProps, setCategoryListProps] = useState();
  const assignCategoriesProps = useAssignItem({
    instance: sale,
    listProps: categoryListProps,
    params,
    setParams,
    mutation: AddSaleCatalogues,
    refetchQuery: GetSimpleCategories,
    queryField: "saleCataloguesAdd",
    querySelector: "categories",
    appName: "categories",
    vars: "notInSales",
  });
  const categorySimpleListProps = useSimpleListProps({
    instance: sale,
    removeMutation: RemoveSaleCatalogues,
    setListProps: setCategoryListProps,
    setParams,
    assignAction: ASSIGN_CATEGORIES,
    appName: "categories",
    selector: "categories",
    vars: "sales",
  });

  const [collectionListProps, setCollectionListProps] = useState();
  const assignCollectionsProps = useAssignItem({
    instance: sale,
    listProps: collectionListProps,
    params,
    setParams,
    mutation: AddSaleCatalogues,
    refetchQuery: GetSimpleCollections,
    queryField: "saleCataloguesAdd",
    querySelector: "collections",
    appName: "collections",
    vars: "notInSales",
  });
  const collectionSimpleListProps = useSimpleListProps({
    instance: sale,
    removeMutation: RemoveSaleCatalogues,
    setListProps: setCollectionListProps,
    setParams,
    assignAction: ASSIGN_COLLECTIONS,
    appName: "collections",
    selector: "collections",
    vars: "sales",
  });

  return (
    <>
      <Tabs
        value={params.activeTab}
        onChange={(_, newValue) => setParams({ activeTab: newValue })}
      >
        <Tab label={`Categories (${sale.categories.totalCount})`} />
        <Tab label={`Collections (${sale.collections.totalCount})`} />
        <Tab label={`Products (${sale.products.totalCount})`} />
      </Tabs>
      {params.activeTab === 0 && <SimpleListCategory {...categorySimpleListProps} />}
      {params.activeTab === 1 && <SimpleListCollection {...collectionSimpleListProps} />}
      {params.activeTab === 2 && <SimpleListProduct {...productSimpleListProps} />}
      <AssignItem {...assignProductsProps} type="product" />
      <AssignItem {...assignCategoriesProps} type="category" />
      <AssignItem {...assignCollectionsProps} type="collection" />
    </>
  );
};
