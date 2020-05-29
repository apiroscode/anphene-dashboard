import gql from "graphql-tag";

export const staffFragment = gql`
  fragment staffFragment on User {
    id
    email
    isStaff
    isActive
    lastLogin
    note
    name
    idCard
    dateJoined
    userPermissions {
      code
      name
    }
  }
`;
