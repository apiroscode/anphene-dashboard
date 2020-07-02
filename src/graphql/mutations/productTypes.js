import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { productTypeDetailFragment, productTypeFragment } from "@/graphql/fragments/productTypes";

export const CREATE_PRODUCT_TYPE = gql`
  mutation CREATE_PRODUCT_TYPE($input: ProductTypeInput!) {
    productTypeCreate(input: $input) {
      errors {
        ...errorFragment
      }
      productType {
        ...productTypeFragment
      }
    }
  }
  ${errorFragment}
  ${productTypeFragment}
`;

export const UPDATE_PRODUCT_TYPE = gql`
  mutation UPDATE_PRODUCT_TYPE($id: ID!, $input: ProductTypeInput!) {
    productTypeUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      productType {
        ...productTypeFragment
      }
    }
  }
  ${errorFragment}
  ${productTypeFragment}
`;

export const DELETE_PRODUCT_TYPE = gql`
  mutation DELETE_PRODUCT_TYPE($id: ID!) {
    productTypeDelete(id: $id) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_PRODUCT_TYPE = gql`
  mutation BULK_DELETE_PRODUCT_TYPES($ids: [ID]!) {
    productTypeBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const ATTRIBUTE_ASSIGN = gql`
  mutation AttributeAssign($productTypeId: ID!, $operations: [AttributeAssignInput]!) {
    attributeAssign(productTypeId: $productTypeId, operations: $operations) {
      errors {
        ...errorFragment
      }
      productType {
        ...productTypeDetailFragment
      }
    }
  }
  ${errorFragment}
  ${productTypeDetailFragment}
`;

export const ATTRIBUTE_UNASSIGN = gql`
  mutation ATTRIBUTE_UNASSIGN($productTypeId: ID!, $attributeIds: [ID]!) {
    attributeUnassign(productTypeId: $productTypeId, attributeIds: $attributeIds) {
      errors {
        ...errorFragment
      }
      productType {
        ...productTypeDetailFragment
      }
    }
  }
  ${errorFragment}
  ${productTypeDetailFragment}
`;

export const REORDER_ATTRIBUTE = gql`
  mutation REORDER_ATTRIBUTE(
    $productTypeId: ID!
    $type: AttributeTypeEnum!
    $moves: [ReorderInput]!
  ) {
    productTypeReorderAttribute(productTypeId: $productTypeId, type: $type, moves: $moves) {
      errors {
        ...errorFragment
      }
      productType {
        ...productTypeDetailFragment
      }
    }
  }
  ${errorFragment}
  ${productTypeDetailFragment}
`;
