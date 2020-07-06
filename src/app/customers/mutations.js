import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";
import { CustomerDetailsFragment } from "./fragments";

export const CreateCustomer = gql`
  mutation CreateCustomer($input: UserCreateInput!) {
    customerCreate(input: $input) {
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

export const UpdateCustomer = gql`
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
    customerUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      user {
        ...CustomerDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${CustomerDetailsFragment}
`;

export const DeleteCustomer = gql`
  mutation DeleteCustomer($id: ID!) {
    customerDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteCustomer = gql`
  mutation BulkDeleteCustomer($ids: [ID]!) {
    customerBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;
