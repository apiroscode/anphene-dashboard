import gql from "graphql-tag";
import {
  AllPermissionsFragment,
  GroupDetailsFragment,
  GroupFragment,
  SimpleGroupsFragment,
  UserFragment,
} from "./fragments";
import { PageInfoFragment } from "@/core/_graphql/fragments";

export const GetAllPermissions = gql`
  query GetAllPermissions {
    ...AllPermissionsFragment
  }
  ${AllPermissionsFragment}
`;

export const GetGroup = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      ...GroupDetailsFragment
    }
    ...AllPermissionsFragment
  }
  ${GroupDetailsFragment}
  ${AllPermissionsFragment}
`;

export const GetGroups = gql`
  query GetGroups(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: GroupSortingInput
    $search: String
  ) {
    groups(
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
          ...GroupFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${GroupFragment}
`;

export const GetSimpleGroups = gql`
  query GetSimpleGroups {
    ...SimpleGroupsFragment
  }
  ${SimpleGroupsFragment}
`;

export const GetAvailableStaff = gql`
  query GetAvailableStaff($id: ID!, $after: String) {
    group(id: $id) {
      id
      availableStaff(first: 10, after: $after) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          node {
            ...UserFragment
          }
        }
      }
    }
  }
  ${PageInfoFragment}
  ${UserFragment}
`;
