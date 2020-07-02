import gql from "graphql-tag";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { menuDetailsFragment } from "@/graphql/fragments/navigation";

export const GET_MENUS = gql`
  query GET_MENUS(
    ${filterVariable.type("MenuSortField")}
    $search: String
  ) {
    menus(
      ${filterVariable.vars}
      filter: { search: $search }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          id
          name
          items {
            id
          }
        }
      }
    }
  }
  ${pageInfo}
`;

export const GET_MENU = gql`
  query GET_MENU($id: ID!) {
    menu(id: $id) {
      ...menuDetailsFragment
    }
    pages(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
    categories(first: 100) {
      edges {
        node {
          id
          name
          level
        }
      }
    }
  }
  ${menuDetailsFragment}
`;
