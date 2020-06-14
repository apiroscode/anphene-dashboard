import gql from "graphql-tag";

import { supplierDetailFragment, supplierFragment } from "@/graphql/fragments/suppliers";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";

export const GET_SUPPLIERS = gql`
  query GET_SUPPLIERS(
    ${filterVariable.type("SupplierSortField")}
    $search: String
  ) {
    suppliers(
      ${filterVariable.vars}
      filter: { search: $search }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...supplierFragment
        }
      }
    }
  }
  ${pageInfo}
  ${supplierFragment}
`;

export const GET_SUPPLIER = gql`
  query GET_SUPPLIER($id: ID!) {
    supplier(id: $id) {
      ...supplierDetailFragment
    }
  }
  ${supplierDetailFragment}
`;
