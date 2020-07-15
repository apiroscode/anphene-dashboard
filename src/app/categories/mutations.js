import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { CategoryDetailsFragment } from "./fragments";

export const CreateCategory = gql`
  mutation CreateCategory($parent: ID, $input: CategoryInput!) {
    categoryCreate(parent: $parent, input: $input) {
      errors {
        ...ErrorFragment
      }
      category {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateCategory = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    categoryUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      category {
        ...CategoryDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${CategoryDetailsFragment}
`;

export const DeleteCategory = gql`
  mutation DeleteCategory($id: ID!) {
    categoryDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteCategory = gql`
  mutation BulkDeleteCategory($ids: [ID]!) {
    categoryBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;
