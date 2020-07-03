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

import { AddVoucherCatalogues, RemoveVoucherCatalogues } from "../../mutations";

export const SpecificProduct = (props) => {
  const { voucher } = props;

  const [params, setParams] = useQS({ activeTab: 0, action: undefined });
  const [productListProps, setProductListProps] = useState();
  const assignProductsProps = useAssignItem({
    instance: voucher,
    listProps: productListProps,
    params,
    setParams,
    mutation: AddVoucherCatalogues,
    refetchQuery: GetProducts,
    queryField: "voucherCataloguesAdd",
    querySelector: "products",
    appName: "products",
    vars: "notInVouchers",
  });
  const productSimpleListProps = useSimpleListProps({
    instance: voucher,
    instanceName: "code",
    removeMutation: RemoveVoucherCatalogues,
    setListProps: setProductListProps,
    setParams,
    assignAction: ASSIGN_PRODUCTS,
    appName: "products",
    selector: "products",
    vars: "vouchers",
  });

  const [categoryListProps, setCategoryListProps] = useState();
  const assignCategoriesProps = useAssignItem({
    instance: voucher,
    listProps: categoryListProps,
    params,
    setParams,
    mutation: AddVoucherCatalogues,
    refetchQuery: GetSimpleCategories,
    queryField: "voucherCataloguesAdd",
    querySelector: "categories",
    appName: "categories",
    vars: "notInVouchers",
  });
  const categorySimpleListProps = useSimpleListProps({
    instance: voucher,
    instanceName: "code",
    removeMutation: RemoveVoucherCatalogues,
    setListProps: setCategoryListProps,
    setParams,
    assignAction: ASSIGN_CATEGORIES,
    appName: "categories",
    selector: "categories",
    vars: "vouchers",
  });

  const [collectionListProps, setCollectionListProps] = useState();
  const assignCollectionsProps = useAssignItem({
    instance: voucher,
    listProps: collectionListProps,
    params,
    setParams,
    mutation: AddVoucherCatalogues,
    refetchQuery: GetSimpleCollections,
    queryField: "voucherCataloguesAdd",
    querySelector: "collections",
    appName: "collections",
    vars: "notInVouchers",
  });
  const collectionSimpleListProps = useSimpleListProps({
    instance: voucher,
    instanceName: "code",
    removeMutation: RemoveVoucherCatalogues,
    setListProps: setCollectionListProps,
    setParams,
    assignAction: ASSIGN_COLLECTIONS,
    appName: "collections",
    selector: "collections",
    vars: "vouchers",
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
      {params.activeTab === 0 && <SimpleListCategory {...categorySimpleListProps} />}
      {params.activeTab === 1 && <SimpleListCollection {...collectionSimpleListProps} />}
      {params.activeTab === 2 && <SimpleListProduct {...productSimpleListProps} />}
      <AssignItem {...assignProductsProps} type="product" />
      <AssignItem {...assignCategoriesProps} type="category" />
      <AssignItem {...assignCollectionsProps} type="collection" />
    </>
  );
};
