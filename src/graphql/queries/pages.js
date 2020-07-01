import gql from "graphql-tag";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { pageDetailFragment, pageFragment } from "@/graphql/fragments/pages";

export const GET_PAGES = gql`
  query GET_ATTRIBUTES(
    ${filterVariable.type("PageSortField")}
    $search: String
  ) {
    pages(
      ${filterVariable.vars}
      filter: { search: $search }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...pageFragment
        }
      }
    }
  }
  ${pageInfo}
  ${pageFragment}
`;

export const GET_PAGE = gql`
  query GET_PAGE($id: ID!) {
    page(id: $id) {
      ...pageDetailFragment
    }
  }
  ${pageDetailFragment}
`;
