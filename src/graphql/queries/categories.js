import gql from "graphql-tag";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { categoryDetailFragment, categoryListFragment } from "@/graphql/fragments/categories";

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES(
    ${filterVariable.type("CategorySortField")}
    $search: String
    $parent: ID
    $level: Int
  ) {
    categories(
      ${filterVariable.vars}, 
      level: $level, 
      filter: { search: $search, parent: $parent}
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...categoryListFragment
        }
      }
    }
  }
  ${pageInfo}
  ${categoryListFragment}  
`;

export const GET_CATEGORY = gql`
  query GET_CATEGORY($id: ID!) {
    category(id: $id) {
      ...categoryDetailFragment
    }
  }
  ${categoryDetailFragment}
`;
