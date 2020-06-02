import gql from "graphql-tag";

import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { staffDetailFragment } from "@/graphql/fragments/staff";

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
          id
          name
          email
          isActive
        }
      }
    }
  }
  ${pageInfo}
`;

export const GET_GROUPS_FOR_STAFF = gql`
  query GET_GROUPS_FOR_STAFF {
    permissionGroups(first: 100) {
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
    permissionGroups(first: 100) {
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
