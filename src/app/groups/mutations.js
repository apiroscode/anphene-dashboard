import gql from "graphql-tag";
import { ErrorFragment } from "@/core/_graphql/fragments";
import { GroupDetailsFragment } from "./fragments";

export const CreateGroup = gql`
  mutation CreateGroup($input: GroupInput!) {
    groupCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      group {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateGroup = gql`
  mutation UpdateGroup($id: ID!, $input: GroupInput!) {
    groupUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      group {
        ...GroupDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${GroupDetailsFragment}
`;

export const DeleteGroup = gql`
  mutation DeleteGroup($id: ID!) {
    groupDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteGroup = gql`
  mutation BulkDeleteGroup($ids: [ID]!) {
    groupBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AssignStaff = gql`
  mutation AssignStaff($groupId: ID!, $staffIds: [ID]!) {
    groupStaffAssign(groupId: $groupId, staffIds: $staffIds) {
      errors {
        ...ErrorFragment
      }
      group {
        ...GroupDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${GroupDetailsFragment}
`;

export const UnassignStaff = gql`
  mutation UnassignStaff($groupId: ID!, $staffIds: [ID]!) {
    groupStaffUnassign(groupId: $groupId, staffIds: $staffIds) {
      errors {
        ...ErrorFragment
      }
      group {
        ...GroupDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${GroupDetailsFragment}
`;
