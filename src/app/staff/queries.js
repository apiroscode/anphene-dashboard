import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { SimpleGroupsFragment } from "../groups/fragments";
import { StaffDetailsFragment, StaffFragment } from "./fragments";

export const GetStaff = gql`
  query GetStaff($id: ID!) {
    user(id: $id) {
      ...StaffDetailsFragment
    }
    ...SimpleGroupsFragment
  }
  ${StaffDetailsFragment}
  ${SimpleGroupsFragment}
`;

export const GetStaffUsers = gql`
  query GetStaffUsers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: UserSortingInput
    $status: StaffMemberStatus
    $search: String
  ) {
    staffUsers(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: { status: $status, search: $search }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...StaffFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${StaffFragment}
`;
