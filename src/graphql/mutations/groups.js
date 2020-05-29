import gql from "graphql-tag";

import { baseGroupFragment, updateGroupFragment } from "@/graphql/fragments/groups";
import { errorFragment } from "@/graphql/fragments/base";

export const CREATE_GROUP = gql`
  mutation CREATE_GROUP($name: String!, $permissions: [PermissionEnum!]!) {
    groupCreate(input: { name: $name, permissions: $permissions }) {
      errors {
        ...errorFragment
      }
      group {
        ...baseGroupFragment
      }
    }
  }
  ${baseGroupFragment}
  ${errorFragment}
`;

export const UPDATE_GROUP = gql`
  mutation UPDATE_GROUP($id: ID!, $name: String!, $permissions: [PermissionEnum!]!) {
    groupUpdate(id: $id, input: { name: $name, permissions: $permissions }) {
      errors {
        ...errorFragment
      }
      group {
        ...updateGroupFragment
      }
    }
  }

  ${updateGroupFragment}
  ${errorFragment}
`;

export const DELETE_GROUP = gql`
  mutation DELETE_GROUP($id: ID!) {
    groupDelete(id: $id) {
      errors {
        ...errorFragment
      }
      group {
        ...baseGroupFragment
      }
    }
  }
  ${baseGroupFragment}
  ${errorFragment}
`;

export const BULK_DELETE_GROUP = gql`
  mutation BULK_DELETE_GROUP($ids: [ID]!) {
    groupBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
      count
    }
  }
  ${errorFragment}
`;
