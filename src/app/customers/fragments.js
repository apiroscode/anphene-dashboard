import gql from "graphql-tag";
import { AddressFragment } from "@/core/_graphql/fragments";

export const CustomerFragment = gql`
  fragment CustomerFragment on User {
    id
    email
    dateJoined
  }
`;

export const CustomerDetailsFragment = gql`
  fragment CustomerDetailsFragment on User {
    id
    note
    email
    dateJoined
    lastLogin
    isActive
    defaultShippingAddress {
      ...AddressFragment
    }
  }
  ${AddressFragment}
`;
