import gql from "graphql-tag";
import { productDetailFragment, productListFragment } from "@/graphql/fragments/products";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS(
    ${filterVariable.type("ProductSortField")}
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
      ${filterVariable.vars}
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
        ...pageInfo
      }
      edges {
        node {
          ...productListFragment
        }
      }
    }
  }
  ${pageInfo}
  ${productListFragment}
`;

const collections_categories = `
  collections(first: 100) {
    edges {
      node {
        id
        name
      }
    }
  }
  categories(first: 100) {
    edges {
      node {
        id
        name
        level
      }
    }
  }
`;

export const suppliers = `
  suppliers(first: 100) {
    edges {
      node {
        id
        name
      }
    }
  }
`;

export const INITIALIZE_PRODUCT_FILTER_DATA = gql`
  query INITIALIZE_PRODUCT_FILTER_DATA {
    ${collections_categories}
    productTypes(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const INITIALIZE_PRODUCT_CREATE = gql`
  query INITIALIZE_PRODUCTS_CREATE {
    ${collections_categories}
    ${suppliers}
    productTypes(first: 100) {
      edges {
        node {
          id
          name
          hasVariants
          productAttributes {
            id
            inputType
            slug
            name
            valueRequired
            values {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      ...productDetailFragment
    }
    ${collections_categories}
    ${suppliers}
  }
  ${productDetailFragment}
`;

export const GET_PRODUCT_VARIANTS = gql`
  query GET_PRODUCT_VARIANTS($id: ID!) {
    product(id: $id) {
      id
      getUniqueSku
      variants {
        id
      }
      productType {
        id
        name
        hasVariants
        variantAttributes {
          id
          name
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
