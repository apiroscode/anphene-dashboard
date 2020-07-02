import gql from "graphql-tag";

import { PageInfoFragment, sorterPagination } from "@/components/_graphql/fragments";

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
    ${sorterPagination.type("PageSortField")}
    $search: String
  ) {
    pages(
      ${sorterPagination.vars}
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
