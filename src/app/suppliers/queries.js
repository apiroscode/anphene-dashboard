import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { SupplierDetailFragment, SupplierFragment } from "./fragments";

export const GetSupplier = gql`
  query GetSupplier($id: ID!) {
    supplier(id: $id) {
      ...SupplierDetailsFragment
    }
  }
  ${SupplierDetailFragment}
`;

export const GetSuppliers = gql`
  query GetSuppliers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: SupplierSortingInput
    $search: String
  ) {
    suppliers(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: { search: $search }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...SupplierFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${SupplierFragment}
`;
