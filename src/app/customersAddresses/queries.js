import gql from "graphql-tag";

import { CustomerAddressesFragment } from "./fragments";

export const GetCustomerAddresses = gql`
  query GetCustomer($id: ID!) {
    user(id: $id) {
      ...CustomerAddressesFragment
    }
  }
  ${CustomerAddressesFragment}
`;
