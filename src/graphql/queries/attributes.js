import gql from "graphql-tag";

import { attributeDetailFragment, attributeFragment } from "@/graphql/fragments/attributes";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";

export const GET_ATTRIBUTES = gql`
  query GET_ATTRIBUTES(
    ${filterVariable.type("AttributeSortField")}
    $search: String
    $valueRequired: Boolean
    $visibleInStorefront: Boolean
    $filterableInStorefront: Boolean
    $filterableInDashboard: Boolean
    $availableInGrid: Boolean
  ) {
    attributes(
      ${filterVariable.vars}
      filter: { 
        search: $search
        valueRequired: $valueRequired
        visibleInStorefront: $visibleInStorefront
        filterableInStorefront: $filterableInStorefront
        filterableInDashboard: $filterableInDashboard
        availableInGrid: $availableInGrid 
      }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...attributeFragment
        }
      }
    }
  }
  ${pageInfo}
  ${attributeFragment}
`;

export const GET_ATTRIBUTE = gql`
  query GET_ATTRIBUTE($id: ID!) {
    attribute(id: $id) {
      ...attributeDetailFragment
    }
  }
  ${attributeDetailFragment}
`;
