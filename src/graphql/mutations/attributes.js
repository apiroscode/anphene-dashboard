import gql from "graphql-tag";

import {
  attributeFragment,
  attributeValuesFragment,
  valueFragment,
} from "@/graphql/fragments/attributes";
import { errorFragment } from "@/graphql/fragments/base";

export const CREATE_ATTRIBUTE = gql`
  mutation CREATE_ATTRIBUTE(
    $name: String!
    $slug: String
    $valueRequired: Boolean
    $visibleInStorefront: Boolean
    $filterableInStorefront: Boolean
    $filterableInDashboard: Boolean
    $storefrontSearchPosition: Int
    $availableInGrid: Boolean
    $inputType: AttributeInputTypeEnum
    $values: [AttributeValueCreateInput]
  ) {
    attributeCreate(
      input: {
        name: $name
        slug: $slug
        valueRequired: $valueRequired
        visibleInStorefront: $visibleInStorefront
        filterableInStorefront: $filterableInStorefront
        filterableInDashboard: $filterableInDashboard
        storefrontSearchPosition: $storefrontSearchPosition
        availableInGrid: $availableInGrid
        inputType: $inputType
        values: $values
      }
    ) {
      errors {
        ...errorFragment
      }
      attribute {
        ...attributeFragment
      }
    }
  }
  ${errorFragment}
  ${attributeFragment}
`;

export const UPDATE_ATTRIBUTE = gql`
  mutation UPDATE_ATTRIBUTE(
    $id: ID!
    $name: String!
    $slug: String
    $valueRequired: Boolean
    $visibleInStorefront: Boolean
    $filterableInStorefront: Boolean
    $filterableInDashboard: Boolean
    $storefrontSearchPosition: Int
    $availableInGrid: Boolean
  ) {
    attributeUpdate(
      id: $id
      input: {
        name: $name
        slug: $slug
        valueRequired: $valueRequired
        visibleInStorefront: $visibleInStorefront
        filterableInStorefront: $filterableInStorefront
        filterableInDashboard: $filterableInDashboard
        storefrontSearchPosition: $storefrontSearchPosition
        availableInGrid: $availableInGrid
      }
    ) {
      errors {
        ...errorFragment
      }
      attribute {
        ...attributeFragment
      }
    }
  }
  ${errorFragment}
  ${attributeFragment}
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DELETE_ATTRIBUTE($id: ID!) {
    attributeDelete(id: $id) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_ATTRIBUTE = gql`
  mutation BULK_DELETE_ATTRIBUTE($ids: [ID]!) {
    attributeBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const CREATE_ATTRIBUTE_VALUE = gql`
  mutation CREATE_ATTRIBUTE_VALUE($attributeId: ID!, $name: String!, $value: String) {
    attributeValueCreate(attribute: $attributeId, input: { name: $name, value: $value }) {
      errors {
        ...errorFragment
      }
      attribute {
        ...attributeValuesFragment
      }
    }
  }
  ${errorFragment}
  ${attributeValuesFragment}
`;

export const UPDATE_ATTRIBUTE_VALUE = gql`
  mutation UPDATE_ATTRIBUTE_VALUE($id: ID!, $name: String!, $value: String) {
    attributeValueUpdate(id: $id, input: { name: $name, value: $value }) {
      errors {
        ...errorFragment
      }
      attributeValue {
        ...valueFragment
      }
    }
  }
  ${errorFragment}
  ${valueFragment}
`;

export const DELETE_ATTRIBUTE_VALUE = gql`
  mutation DeleteAttributeValue($id: ID!) {
    attributeValueDelete(id: $id) {
      errors {
        ...errorFragment
      }
      attribute {
        ...attributeValuesFragment
      }
    }
  }
  ${errorFragment}
  ${attributeValuesFragment}
`;

export const REORDER_ATTRIBUTE_VALUES = gql`
  mutation ReorderAttributeValues($attributeId: ID!, $valueId: ID!, $sortOrder: Int!) {
    attributeReorderValues(
      attributeId: $attributeId
      moves: { id: $valueId, sortOrder: $sortOrder }
    ) {
      errors {
        ...errorFragment
      }
      attribute {
        ...attributeValuesFragment
      }
    }
  }
  ${errorFragment}
  ${attributeValuesFragment}
`;
