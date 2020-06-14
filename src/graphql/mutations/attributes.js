import gql from "graphql-tag";

import {
  attributeFragment,
  attributeValuesFragment,
  valueFragment,
} from "@/graphql/fragments/attributes";
import { errorFragment } from "@/graphql/fragments/base";

export const CREATE_ATTRIBUTE = gql`
  mutation CREATE_ATTRIBUTE($input: AttributeCreateInput!) {
    attributeCreate(input: $input) {
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
  mutation UPDATE_ATTRIBUTE($id: ID!, $input: AttributeInput!) {
    attributeUpdate(id: $id, input: $input) {
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
  mutation CREATE_ATTRIBUTE_VALUE($attributeId: ID!, $input: AttributeValueInput!) {
    attributeValueCreate(attribute: $attributeId, input: $input) {
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
  mutation UPDATE_ATTRIBUTE_VALUE($id: ID!, $input: AttributeValueInput!) {
    attributeValueUpdate(id: $id, input: $input) {
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
  mutation ReorderAttributeValues($attributeId: ID!, $moves: [ReorderInput]!) {
    attributeReorderValues(attributeId: $attributeId, moves: $moves) {
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
