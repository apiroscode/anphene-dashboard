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

export const GET_SIMPLE_CATEGORIES = gql`
  query GET_SIMPLE_CATEGORIES(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
    $sales: [ID]
    $notInSales: [ID]
    $vouchers: [ID]
    $notInVouchers: [ID]
  ) {
    categories(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: {
        search: $search
        sales: $sales
        notInSales: $notInSales
        vouchers: $vouchers
        notInVouchers: $notInVouchers
      }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          id
          name
          level
          products {
            totalCount
          }
        }
      }
    }
  }
  ${pageInfo}
`;
