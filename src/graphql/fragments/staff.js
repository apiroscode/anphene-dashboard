import gql from "graphql-tag";

export const staffFragment = gql`
  fragment staffFragment on User {
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

export const staffListFragment = gql`
  fragment staffListFragment on User {
    id
    name
    email
    isActive
    permissionGroups {
      id
      name
    }
  }
`;

export const staffDetailFragment = gql`
  fragment staffDetailFragment on User {
    id
    email
    isActive
    note
    name
    idCard
    dateJoined
    permissionGroups {
      id
      name
    }
  }
`;
