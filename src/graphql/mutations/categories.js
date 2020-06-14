import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { categoryDetailFragment } from "@/graphql/fragments/categories";

export const CREATE_CATEGORY = gql`
  mutation CREATE_CATEGORY($parent: ID, $input: CategoryInput!) {
    categoryCreate(parent: $parent, input: $input) {
      errors {
        ...errorFragment
      }
      category {
        id
        name
      }
    }
  }
  ${errorFragment}
`;

export const UPDATE_CATEGORY = gql`
  mutation UPDATE_CATEGORY($id: ID!, $input: CategoryInput!) {
    categoryUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      category {
        ...categoryDetailFragment
      }
    }
  }
  ${errorFragment}
  ${categoryDetailFragment}
`;

export const DELETE_CATEGORY = gql`
  mutation DELETE_CATEGORY($id: ID!) {
    categoryDelete(id: $id) {
      errors {
        ...errorFragment
      }
      category {
        id
        name
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_CATEGORY = gql`
  mutation BULK_DELETE_CATEGORY($ids: [ID]!) {
    categoryBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;
