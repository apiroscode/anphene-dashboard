import gql from "graphql-tag";

import { PageInfoFragment, sorterPagination } from "@/components/_graphql/fragments";

import { SupplierDetailFragment, SupplierFragment } from "./fragments";

export const getSupplier = gql`
  query GetSupplier($id: ID!) {
    supplier(id: $id) {
      ...SupplierDetailsFragment
    }
  }
  ${SupplierDetailFragment}
`;

export const getSuppliers = gql`
  query GetSuppliers(
    ${sorterPagination.type("SupplierSortField")}
    $search: String
  ) {
    suppliers(
      ${sorterPagination.vars}
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
