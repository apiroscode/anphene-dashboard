import gql from "graphql-tag";

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    field
    message
  }
`;

export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export const AuthLoginFragment = gql`
  fragment AuthLoginFragment on User {
    id
    email
    isStaff
    isActive
    note
    name
    userPermissions {
      code
      name
    }
  }
`;
