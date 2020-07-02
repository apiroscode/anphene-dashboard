import gql from "graphql-tag";

import {
  baseGroupFragment,
  updateGroupFragment,
  usersGroupFragment,
} from "@/graphql/fragments/groups";
import { errorFragment } from "@/graphql/fragments/base";

export const CREATE_GROUP = gql`
  mutation CREATE_GROUP($input: GroupInput!) {
    groupCreate(input: $input) {
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
  mutation UPDATE_GROUP($id: ID!, $input: GroupInput!) {
    groupUpdate(id: $id, input: $input) {
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

export const ASSIGN_STAFF = gql`
  mutation ASSIGN_STAFF($groupId: ID!, $staffIds: [ID]!) {
    groupStaffAssign(groupId: $groupId, staffIds: $staffIds) {
      errors {
        ...errorFragment
      }
      group {
        ...usersGroupFragment
      }
    }
  }
  ${errorFragment}
  ${usersGroupFragment}
`;

export const UNASSIGN_STAFF = gql`
  mutation UNASSIGN_STAFF($groupId: ID!, $staffIds: [ID]!) {
    groupStaffUnassign(groupId: $groupId, staffIds: $staffIds) {
      errors {
        ...errorFragment
      }
      group {
        ...usersGroupFragment
      }
    }
  }
  ${errorFragment}
  ${usersGroupFragment}
`;
