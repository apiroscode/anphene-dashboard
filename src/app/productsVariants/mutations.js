import gql from "graphql-tag";
import { ErrorFragment } from "@/core/_graphql/fragments";
import { ProductVariantDetailsFragment } from "./fragments";

export const CreateVariant = gql`
  mutation CreateVariant($input: ProductVariantCreateInput!) {
    productVariantCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      productVariant {
        id
        name
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateVariant = gql`
  mutation UpdateVariant($id: ID!, $input: ProductVariantInput!) {
    productVariantUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      productVariant {
        ...ProductVariantDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductVariantDetailsFragment}
`;

export const DeleteVariant = gql`
  mutation DeleteVariant($id: ID!) {
    productVariantDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkCreateVariant = gql`
  mutation BulkCreateVariant($product: ID!, $variants: [ProductVariantBulkCreateInput]!) {
    productVariantBulkCreate(product: $product, variants: $variants) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteVariant = gql`
  mutation BulkDeleteVariant($ids: [ID]!) {
    productVariantBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AssignVariantImage = gql`
  mutation AssignVariantImage($imageId: ID!, $variantId: ID!) {
    variantImageAssign(imageId: $imageId, variantId: $variantId) {
      errors {
        ...ErrorFragment
      }
      productVariant {
        ...ProductVariantDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductVariantDetailsFragment}
`;

export const UnassignVariantImage = gql`
  mutation UnassignVariantImage($imageId: ID!, $variantId: ID!) {
    variantImageUnassign(imageId: $imageId, variantId: $variantId) {
      errors {
        ...ErrorFragment
      }
      productVariant {
        ...ProductVariantDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductVariantDetailsFragment}
`;
