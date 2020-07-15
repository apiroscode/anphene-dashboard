import gql from "graphql-tag";
import { ErrorFragment } from "@/core/_graphql/fragments";
import { StaffDetailsFragment } from "./fragments";

export const CreateStaff = gql`
  mutation CreateStaff($input: StaffCreateInput!) {
    staffCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      user {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateStaff = gql`
  mutation UpdateStaff($id: ID!, $input: StaffInput!) {
    staffUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      user {
        ...StaffDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${StaffDetailsFragment}
`;

export const DeleteStaff = gql`
  mutation DeleteStaff($id: ID!) {
    staffDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteStaff = gql`
  mutation BulkDeleteStaff($ids: [ID]!) {
    staffBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkActivateStaff = gql`
  mutation BulkActivateStaff($ids: [ID]!, $isActive: Boolean!) {
    staffBulkActivate(ids: $ids, isActive: $isActive) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;
