import gql from "graphql-tag";
import { AddressFragment } from "@/core/_graphql/fragments";

export const CustomerAddressesFragment = gql`
  fragment CustomerAddressesFragment on User {
    id
    email
    defaultShippingAddress {
      id
    }
    addresses {
      ...AddressFragment
    }
  }
  ${AddressFragment}
`;
