import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";
import { useMutation } from "@/utils/hooks";

import { AvatarThumb } from "@/components/AvatarThumb";
import { StatusLabel } from "@/components/StatusLabel";
import { List } from "@/components/List";
import { QueryWrapper } from "@/components/QueryWrapper";
import { FilterCheckBox, FilterRadioBox, FilterRange } from "@/components/ListFilters";

import { GetProducts, InitializeProductList } from "../queries";
import { BulkDeleteProduct, BulkPublishProduct } from "../mutations";

const Base = ({ collections, categories, productTypes }) => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BulkDeleteProduct);
  const [bulkPublish, { loading: publishLoading }] = useMutation(BulkPublishProduct);

  const props = {
    appName: "Product",
    query: GetProducts,
    queryField: "products",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "isPublished",
        label: "Visibility",
        defaultValue: true,
        items: [
          {
            label: "Visible",
            value: true,
          },
          {
            label: "Hidden",
            value: false,
          },
        ],
      },
      {
        component: <FilterRadioBox />,
        field: "stockAvailability",
        label: "Stock Status",
        defaultValue: "IN_STOCK",
        items: [
          {
            label: "Available",
            value: "IN_STOCK",
          },
          {
            label: "Out Of Stock",
            value: "OUT_OF_STOCK",
          },
        ],
      },
      {
        component: <FilterRange filterType="number" />,
        field: "price",
        label: "Price",
        type: "range",
      },
      {
        component: <FilterCheckBox />,
        field: "collections",
        label: "Collections",
        defaultValue: [],
        items: collections.map(({ node }) => ({ label: node.name, value: node.id })),
      },
      {
        component: <FilterCheckBox />,
        field: "categories",
        label: "Categories",
        defaultValue: [],
        items: categories.map(({ node }) => ({ label: node.name, value: node.id })),
      },
      {
        component: <FilterCheckBox />,
        field: "productTypes",
        label: "Product Types",
        defaultValue: [],
        items: productTypes.map(({ node }) => ({ label: node.name, value: node.id })),
      },
    ],
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "",
          field: "thumbnail",
          align: "center",
          width: 32,
          render: (value) => <AvatarThumb thumbnail={value?.url} />,
        },
        {
          label: "Name",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Type",
          field: "productType.name",
          align: "left",
        },
        {
          label: "Published",
          field: "isPublished",
          align: "left",
          render: (isPublished) => (
            <StatusLabel
              status={isPublished ? "success" : "error"}
              label={isPublished ? "Published" : "Not published"}
            />
          ),
        },
        {
          label: "Price",
          field: "pricing.priceRange.start",
          align: "right",
          sortField: "PRICE",
          render: (price) => `Rp ${price.toLocaleString()}`,
        },
      ],
    },
    bulkLoading: deleteLoading || publishLoading,
    bulkMutations: [
      {
        mutation: bulkPublish,
        type: "text",
        label: "unpublish",
        vars: {
          isPublished: false,
        },
      },
      {
        mutation: bulkPublish,
        type: "text",
        label: "publish",
        vars: {
          isPublished: true,
        },
      },
      {
        mutation: bulkDelete,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
      },
    ],
  };
  return <List {...props} />;
};

export default () => {
  return (
    <QueryWrapper query={InitializeProductList} fieldName="collections" vars={{}}>
      {({ collections, categories, productTypes }) => (
        <Base
          collections={collections.edges}
          categories={categories.edges}
          productTypes={productTypes.edges}
        />
      )}
    </QueryWrapper>
  );
};
