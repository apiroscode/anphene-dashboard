import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { SimpleCategoriesFragment } from "../categories/fragments";
import { SimpleCollectionsFragment } from "../collections/fragments";
import { SimpleSuppliersFragment } from "../suppliers/fragments";
import { ProductTypesFragment, SimpleProductTypesFragment } from "../productTypes/fragments";

import { ProductDetailsFragment, ProductFragment } from "./fragments";

export const GetProducts = gql`
  query GetProducts(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: ProductSortingInput
    $isPublished: Boolean
    $hasCategory: Boolean
    $price: PriceRangeInput
    $stockAvailability: StockAvailability
    $search: String
    $categories: [ID]
    $productTypes: [ID]
    $collections: [ID]
    $notInCollections: [ID]
    $sales: [ID]
    $notInSales: [ID]
    $vouchers: [ID]
    $notInVouchers: [ID]
  ) {
    products(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: {
        isPublished: $isPublished
        hasCategory: $hasCategory
        price: $price
        stockAvailability: $stockAvailability
        search: $search
        categories: $categories
        productTypes: $productTypes
        collections: $collections
        notInCollections: $notInCollections
        sales: $sales
        notInSales: $notInSales
        vouchers: $vouchers
        notInVouchers: $notInVouchers
      }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${ProductFragment}
`;

export const GetProduct = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductDetailsFragment
    }
    ...SimpleCategoriesFragment
    ...SimpleCollectionsFragment
    ...SimpleSuppliersFragment
  }
  ${ProductDetailsFragment}
`;

export const InitializeProductCreate = gql`
  query InitializeProductCreate {
    ...SimpleCategoriesFragment
    ...SimpleCollectionsFragment
    ...SimpleSuppliersFragment
    ...ProductTypesFragment
  }
  ${SimpleCategoriesFragment}
  ${SimpleCollectionsFragment}
  ${SimpleSuppliersFragment}
  ${ProductTypesFragment}
`;

export const InitializeProductList = gql`
  query InitializeProductList {
    ...SimpleCategoriesFragment
    ...SimpleCollectionsFragment
    ...SimpleProductTypesFragment
  }
  ${SimpleCategoriesFragment}
  ${SimpleCollectionsFragment}
  ${SimpleProductTypesFragment}
`;
