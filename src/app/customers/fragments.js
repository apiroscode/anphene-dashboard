import gql from "graphql-tag";
import { AddressFragment } from "@/core/_graphql/fragments";

export const CustomerFragment = gql`
  fragment CustomerFragment on User {
    id
    email
  }
`;

export const CustomerDetailsFragment = gql`
  fragment CustomerDetailsFragment on User {
    id
    email
    defaultShippingAddress {
      ...AddressFragment
    }
  }
  ${AddressFragment}
`;
