import gql from "graphql-tag";

import { staffDetailFragment } from "@/graphql/fragments/staff";

export const CREATE_STAFF = gql`
  mutation CREATE_STAFF($input: StaffCreateInput!) {
    staffCreate(input: $input) {
      errors {
        field
        message
      }
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_STAFF = gql`
  mutation UPDATE_STAFF($id: ID!, $input: StaffInput!) {
    staffUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      user {
        ...staffDetailFragment
      }
    }
  }
  ${staffDetailFragment}
`;

export const DELETE_STAFF = gql`
  mutation DELETE_STAFF($id: ID!) {
    staffDelete(id: $id) {
      errors {
        field
        message
      }
      user {
        id
        name
      }
    }
  }
`;

export const BULK_DELETE_STAFF = gql`
  mutation BULK_DELETE_STAFF($ids: [ID]!) {
    staffBulkDelete(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;

export const BULK_ACTIVATE_STAFF = gql`
  mutation BULK_ACTIVATE_STAFF($ids: [ID]!) {
    staffBulkActivate(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;

export const BULK_DEACTIVATE_STAFF = gql`
  mutation BULK_DEACTIVATE_STAFF($ids: [ID]!) {
    staffBulkDeactivate(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;
