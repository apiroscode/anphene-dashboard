import gql from "graphql-tag";

import { PageInfoFragment, sorterPagination } from "@/components/_graphql/fragments";

import { CategoryDetailsFragment, CategoryFragment } from "./fragments";

export const getCategory = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      ...CategoryDetailsFragment
    }
  }
  ${CategoryDetailsFragment}
`;

export const getCategories = gql`
  query GetCategories(
     ${sorterPagination.type("CategorySortField")}
    $search: String, 
    $parent: ID, 
    $level: Int
  ) {
    categories(
      ${sorterPagination.vars}
      level: $level, 
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

export const getSimpleCategories = gql`
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
