import gql from "graphql-tag";

import {
  listGroupFragment,
  permissionsFragment,
  updateGroupFragment,
} from "@/graphql/fragments/groups";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";

export const GET_ALL_PERMISSIONS = gql`
  query GET_ALL_PERMISSIONS {
    allPermissions {
      ...permissionsFragment
    }
  }
  ${permissionsFragment}
`;

export const GET_GROUPS = gql`
  query GET_GROUPS(
    ${filterVariable.type("GroupSortField")}
    $search: String
  ) {
    groups(
      ${filterVariable.vars}
      filter: { search: $search }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...listGroupFragment
        }
      }
    }
  }
  ${pageInfo}
  ${listGroupFragment}
`;

export const GET_GROUP = gql`
  query GET_GROUP($id: ID!) {
    group(id: $id) {
      ...updateGroupFragment
    }
    allPermissions {
      ...permissionsFragment
    }
  }
  ${updateGroupFragment}
  ${permissionsFragment}
`;

export const GET_AVAILABLE_STAFF = gql`
  query GET_AVAILABLE_STAFF($id: ID!, $after: String) {
    group(id: $id) {
      id
      availableStaff(first: 10, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
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
  }
`;
