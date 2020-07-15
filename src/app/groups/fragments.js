import gql from "graphql-tag";

export const PermissionFragment = gql`
  fragment PermissionFragment on Permission {
    code
    name
  }
`;

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    name
    email
    isActive
  }
`;

export const GroupFragment = gql`
  fragment GroupFragment on Group {
    id
    name
  }
`;

export const SimpleGroupsFragment = gql`
  fragment SimpleGroupsFragment on Query {
    groups(first: 100) {
      edges {
        node {
          ...GroupFragment
        }
      }
    }
  }
  ${GroupFragment}
`;

export const GroupDetailsFragment = gql`
  fragment GroupDetailsFragment on Group {
    ...GroupFragment
    users {
      ...UserFragment
    }
    permissions {
      ...PermissionFragment
    }
  }
  ${GroupFragment}
  ${UserFragment}
  ${PermissionFragment}
`;

export const AllPermissionsFragment = gql`
  fragment AllPermissionsFragment on Query {
    allPermissions {
      ...PermissionFragment
    }
  }
  ${PermissionFragment}
`;
