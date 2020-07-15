import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { PageDetailsFragment, PageFragment } from "./fragments";

export const GetPage = gql`
  query GetPage($id: ID!) {
    page(id: $id) {
      ...PageDetailsFragment
    }
  }
  ${PageDetailsFragment}
`;

export const GetPages = gql`
  query GetPages(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: PageSortingInput
    $search: String
  ) {
    pages(
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
          ...PageFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${PageFragment}
`;
