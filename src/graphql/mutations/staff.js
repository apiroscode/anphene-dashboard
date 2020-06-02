import gql from "graphql-tag";

import { staffDetailFragment } from "@/graphql/fragments/staff";

export const CREATE_STAFF = gql`
  mutation CREATE_STAFF(
    $email: String!
    $note: String
    $name: String!
    $idCard: Upload
    $groups: [ID!]
    $redirectUrl: String!
  ) {
    staffCreate(
      input: {
        email: $email
        note: $note
        name: $name
        idCard: $idCard
        groups: $groups
        redirectUrl: $redirectUrl
      }
    ) {
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
  mutation UPDATE_STAFF(
    $id: ID!
    $email: String!
    $note: String
    $name: String!
    $idCard: Upload
    $groups: [ID!]
  ) {
    staffUpdate(
      id: $id
      input: { email: $email, note: $note, name: $name, idCard: $idCard, groups: $groups }
    ) {
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
