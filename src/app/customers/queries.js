import gql from "graphql-tag";
import { PageInfoFragment } from "@/core/_graphql/fragments";

import { CustomerDetailsFragment, CustomerFragment } from "./fragments";

export const GetCustomer = gql`
  query GetCustomer($id: ID!) {
    user(id: $id) {
      ...CustomerDetailsFragment
    }
  }
  ${CustomerDetailsFragment}
`;

export const GetCustomers = gql`
  query GetCustomers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: UserSortingInput
    $search: String
    $dateJoined: DateRangeInput
  ) {
    customers(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: { search: $search, dateJoined: $dateJoined }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...CustomerFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${CustomerFragment}
`;
