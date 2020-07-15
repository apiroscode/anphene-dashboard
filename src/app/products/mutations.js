import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { ProductDetailsFragment } from "./fragments";

export const CreateProduct = gql`
  mutation CreateProduct($input: ProductCreateInput!) {
    productCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      product {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateProduct = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    productUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      product {
        ...ProductDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductDetailsFragment}
`;

export const DeleteProduct = gql`
  mutation DeleteProduct($id: ID!) {
    productDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteProduct = gql`
  mutation BulkDeleteProduct($ids: [ID]!) {
    productBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkPublishProduct = gql`
  mutation BulkPublishProduct($ids: [ID]!, $isPublished: Boolean!) {
    productBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const GenerateSku = gql`
  mutation GenerateSku($name: String) {
    productGetSku(name: $name) {
      sku
    }
  }
`;
