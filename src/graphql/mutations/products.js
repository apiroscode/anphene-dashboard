import gql from "graphql-tag";

import { errorFragment } from "@/graphql/fragments/base";
import { productDetailFragment } from "@/graphql/fragments/products";

// ProductMutations
export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT($input: ProductCreateInput!) {
    productCreate(input: $input) {
      errors {
        ...errorFragment
      }
      product {
        id
        name
      }
    }
  }
  ${errorFragment}
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT($id: ID!, $input: ProductInput!) {
    productUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      product {
        ...productDetailFragment
      }
    }
  }
  ${errorFragment}
  ${productDetailFragment}
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    productDelete(id: $id) {
      errors {
        ...errorFragment
      }
      product {
        id
        name
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_PRODUCT = gql`
  mutation BULK_DELETE_PRODUCT($ids: [ID]!) {
    productBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_PUBLISH_PRODUCT = gql`
  mutation BULK_PUBLISH_PRODUCT($ids: [ID]!, $isPublished: Boolean!) {
    productBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const GENERATE_SKU = gql`
  mutation GENERATE_SKU($name: String) {
    productGetSku(name: $name) {
      sku
    }
  }
`;
