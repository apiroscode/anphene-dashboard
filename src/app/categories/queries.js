import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { CategoryDetailsFragment, CategoryFragment } from "./fragments";

export const GetCategory = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      ...CategoryDetailsFragment
    }
  }
  ${CategoryDetailsFragment}
`;

export const GetCategories = gql`
  query GetCategories(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: CategorySortingInput
    $search: String
    $parent: ID
    $level: Int
  ) {
    categories(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      level: $level
      filter: { search: $search, parent: $parent }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...CategoryFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${CategoryFragment}
`;

export const GetSimpleCategories = gql`
  query GetSimpleCategories(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
    $sales: [ID]
    $notInSales: [ID]
    $vouchers: [ID]
    $notInVouchers: [ID]
  ) {
    categories(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: {
        search: $search
        sales: $sales
        notInSales: $notInSales
        vouchers: $vouchers
        notInVouchers: $notInVouchers
      }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          id
          name
          level
          products {
            totalCount
          }
        }
      }
    }
  }
  ${PageInfoFragment}
`;
