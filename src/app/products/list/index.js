import React from "react";

import { List, QueryWrapper } from "@/components/Template";
import { INITIALIZE_PRODUCT_FILTER_DATA, GET_PRODUCTS } from "@/graphql/queries/products";
import { BULK_PUBLISH_PRODUCT, BULK_DELETE_PRODUCT } from "@/graphql/mutations/products";
import { useMutation } from "@/utils/hooks";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { StatusLabel } from "@/components/StatusLabel";
import { AvatarThumb } from "@/components/AvatarThumb";
import { FilterCheckBox, FilterRadioBox, FilterRange } from "@/components/Template/List/Filters";

const Base = ({ collections, categories, productTypes }) => {
  console.log(collections, categories, productTypes);
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BULK_DELETE_PRODUCT);
  const [bulkPublish, { loading: publishLoading }] = useMutation(BULK_PUBLISH_PRODUCT);

  const props = {
    appName: "Product",
    query: GET_PRODUCTS,
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
    <QueryWrapper query={INITIALIZE_PRODUCT_FILTER_DATA} fieldName="collections" vars={{}}>
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
