import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { MenuDetailsFragment, MenuFragment } from "./fragments";
import { SimplePagesFragment } from "../pages/fragments";
import { SimpleCategoriesFragment } from "../categories/fragments";
import { SimpleCollectionsFragment } from "../collections/fragments";

export const GetMenu = gql`
  query GetMenu($id: ID!) {
    menu(id: $id) {
      ...MenuDetailsFragment
    }
    ...SimplePagesFragment
    ...SimpleCategoriesFragment
    ...SimpleCollectionsFragment
  }
  ${MenuDetailsFragment}
  ${SimplePagesFragment}
  ${SimpleCategoriesFragment}
  ${SimpleCollectionsFragment}
`;

export const GetMenus = gql`
  query GetMenus(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: MenuSortingInput
    $search: String
  ) {
    menus(
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
          ...MenuFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${MenuFragment}
`;
