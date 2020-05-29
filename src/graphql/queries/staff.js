import gql from "graphql-tag";

import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";

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
