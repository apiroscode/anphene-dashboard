import gql from "graphql-tag";

import { PageInfoFragment, sorterPagination } from "@/components/_graphql/fragments";

import { AttributeDetailsFragment, AttributeFragment } from "./fragments";

export const GetAttribute = gql`
  query GetAttribute($id: ID!) {
    attribute(id: $id) {
      ...AttributeDetailsFragment
    }
  }
  ${AttributeDetailsFragment}
`;

export const GetAttributes = gql`
  query GetAttributes(
    ${sorterPagination.type("AttributeSortField")}
    $search: String
    $valueRequired: Boolean
    $visibleInStorefront: Boolean
    $filterableInStorefront: Boolean
    $filterableInDashboard: Boolean
    $availableInGrid: Boolean
  ) {
    attributes(
      ${sorterPagination.vars}
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
        ...PageInfoFragment
      }
      edges {
        node {
          ...AttributeFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${AttributeFragment}
`;
