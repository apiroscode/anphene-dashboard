import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";
import { CustomerAddressesFragment } from "./fragments";

export const CreateAddress = gql`
  mutation CreateAddress($input: AddressInput!, $userId: ID!) {
    addressCreate(input: $input, userId: $userId) {
      errors {
        ...ErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
  ${ErrorFragment}
  ${CustomerAddressesFragment}
`;

export const UpdateAddress = gql`
  mutation UpdateAddress($id: ID!, $input: AddressInput!) {
    addressUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }

  ${ErrorFragment}
  ${CustomerAddressesFragment}
`;

export const DeleteAddress = gql`
  mutation DeleteAddress($id: ID!) {
    addressDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
  ${ErrorFragment}
  ${CustomerAddressesFragment}
`;

export const SetDefaultAddress = gql`
  mutation SetDefaultAddress($addressId: ID!, $userId: ID!) {
    addressSetDefault(addressId: $addressId, userId: $userId) {
      errors {
        ...ErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
  ${ErrorFragment}
  ${CustomerAddressesFragment}
`;
