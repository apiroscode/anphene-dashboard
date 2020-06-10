import gql from "graphql-tag";

import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { staffDetailFragment, staffListFragment } from "@/graphql/fragments/staff";

export const GET_STAFF_USERS = gql`
  query GET_STAFF_USERS(
    ${filterVariable.type("UserSortField")}
    $status: StaffMemberStatus
    $search: String
  ) {
    staffUsers(
      ${filterVariable.vars}
      filter: { status: $status, search: $search }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
         ...staffListFragment
        }
      }
    }
  }
  ${pageInfo}
  ${staffListFragment}
`;

export const GET_GROUPS_FOR_STAFF = gql`
  query GET_GROUPS_FOR_STAFF {
    groups(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const GET_STAFF = gql`
  query GET_STAFF($id: ID!) {
    user(id: $id) {
      ...staffDetailFragment
    }
    groups(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
  ${staffDetailFragment}
`;
