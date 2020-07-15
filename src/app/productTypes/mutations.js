import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { ProductTypeDetailsFragment, ProductTypeFragment } from "./fragments";

export const CreateProductType = gql`
  mutation CreateProductType($input: ProductTypeInput!) {
    productTypeCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      productType {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateProductType = gql`
  mutation UpdateProductType($id: ID!, $input: ProductTypeInput!) {
    productTypeUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      productType {
        ...ProductTypeFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductTypeFragment}
`;

export const DeleteProductType = gql`
  mutation DeleteProductType($id: ID!) {
    productTypeDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteProductType = gql`
  mutation BulkDeleteProductType($ids: [ID]!) {
    productTypeBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AssignAttribute = gql`
  mutation AssignAttribute($productTypeId: ID!, $operations: [AttributeAssignInput]!) {
    attributeAssign(productTypeId: $productTypeId, operations: $operations) {
      errors {
        ...ErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductTypeDetailsFragment}
`;

export const UnassignAttribute = gql`
  mutation UnassignAttribute($productTypeId: ID!, $attributeIds: [ID]!) {
    attributeUnassign(productTypeId: $productTypeId, attributeIds: $attributeIds) {
      errors {
        ...ErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductTypeDetailsFragment}
`;

export const ReorderAttributes = gql`
  mutation ReorderAttributes(
    $productTypeId: ID!
    $type: AttributeTypeEnum!
    $moves: [ReorderInput]!
  ) {
    productTypeReorderAttribute(productTypeId: $productTypeId, type: $type, moves: $moves) {
      errors {
        ...ErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductTypeDetailsFragment}
`;
