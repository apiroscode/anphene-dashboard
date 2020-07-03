import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

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
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: AttributeSortingInput
    $search: String
    $valueRequired: Boolean
    $visibleInStorefront: Boolean
    $filterableInStorefront: Boolean
    $filterableInDashboard: Boolean
    $availableInGrid: Boolean
  ) {
    attributes(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
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
