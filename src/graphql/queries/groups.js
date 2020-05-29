import gql from "graphql-tag";

import { listGroupFragment, permissionsFragment } from "@/graphql/fragments/groups";
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
    ${filterVariable.type("PermissionGroupSortField")}
    $search: String
  ) {
    permissionGroups(
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
