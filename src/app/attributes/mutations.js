import gql from "graphql-tag";

import { ErrorFragment } from "@/components/_graphql/fragments";

import { AttributeDetailsFragment } from "./fragments";

export const CreateAttribute = gql`
  mutation CreateAttribute($input: AttributeCreateInput!) {
    attributeCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      attribute {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateAttribute = gql`
  mutation UpdateAttribute($id: ID!, $input: AttributeBaseInput!) {
    attributeUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      attribute {
        ...AttributeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${AttributeDetailsFragment}
`;

export const DeleteAttribute = gql`
  mutation DeleteAttribute($id: ID!) {
    attributeDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteAttribute = gql`
  mutation BulkDeleteAttribute($ids: [ID]!) {
    attributeBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const CreateAttributeValue = gql`
  mutation CreateAttributeValue($attributeId: ID!, $input: AttributeValueCreateInput!) {
    attributeValueCreate(attribute: $attributeId, input: $input) {
      errors {
        ...ErrorFragment
      }
      attribute {
        ...AttributeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${AttributeDetailsFragment}
`;

export const UpdateAttributeValue = gql`
  mutation UpdateAttributeValue($id: ID!, $input: AttributeValueCreateInput!) {
    attributeValueUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      attributeValue {
        ...AttributeValueFragment
      }
    }
  }
  ${ErrorFragment}
  ${AttributeDetailsFragment}
`;

export const DeleteAttributeValue = gql`
  mutation DeleteAttributeValue($id: ID!) {
    attributeValueDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
      attribute {
        ...AttributeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${AttributeDetailsFragment}
`;

export const ReorderAttributeValue = gql`
  mutation ReorderAttributeValue($attributeId: ID!, $moves: [ReorderInput]!) {
    attributeReorderValues(attributeId: $attributeId, moves: $moves) {
      errors {
        ...ErrorFragment
      }
      attribute {
        ...AttributeDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${AttributeDetailsFragment}
`;
