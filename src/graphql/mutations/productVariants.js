import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { variantFragment } from "@/graphql/fragments/productVariants";

export const CREATE_VARIANT = gql`
  mutation CREATE_VARIANT($input: ProductVariantCreateInput!) {
    productVariantCreate(input: $input) {
      errors {
        ...errorFragment
      }
      productVariant {
        id
        name
      }
    }
  }
  ${errorFragment}
`;

export const UPDATE_VARIANT = gql`
  mutation UPDATE_VARIANT($id: ID!, $input: ProductVariantInput!) {
    productVariantUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      productVariant {
        ...variantFragment
      }
    }
  }
  ${errorFragment}
  ${variantFragment}
`;

export const DELETE_VARIANT = gql`
  mutation DELETE_VARIANT($id: ID!) {
    productVariantDelete(id: $id) {
      errors {
        ...errorFragment
      }
      productVariant {
        id
      }
    }
  }
  ${errorFragment}
`;

export const BULK_CREATE_VARIANT = gql`
  mutation BULK_CREATE_VARIANT($product: ID!, $variants: [ProductVariantBulkCreateInput]!) {
    productVariantBulkCreate(product: $product, variants: $variants) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_VARIANT = gql`
  mutation BULK_DELETE_VARIANT($ids: [ID]!) {
    productVariantBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const VARIANT_IMAGE_ASSIGN = gql`
  mutation VARIANT_IMAGE_ASSIGN($imageId: ID!, $variantId: ID!) {
    variantImageAssign(imageId: $imageId, variantId: $variantId) {
      errors {
        ...errorFragment
      }
      productVariant {
        ...variantFragment
      }
    }
  }
  ${errorFragment}
  ${variantFragment}
`;

export const VARIANT_IMAGE_UNASSIGN = gql`
  mutation VARIANT_IMAGE_UNASSIGN($imageId: ID!, $variantId: ID!) {
    variantImageUnassign(imageId: $imageId, variantId: $variantId) {
      errors {
        ...errorFragment
      }
      productVariant {
        ...variantFragment
      }
    }
  }
  ${errorFragment}
  ${variantFragment}
`;
