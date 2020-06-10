import gql from "graphql-tag";

export const permissionsFragment = gql`
  fragment permissionsFragment on Permission {
    code
    name
  }
`;

export const baseGroupFragment = gql`
  fragment baseGroupFragment on Group {
    id
    name
  }
`;

export const listGroupFragment = gql`
  fragment listGroupFragment on Group {
    ...baseGroupFragment
    users {
      id
      name
      email
    }
  }
  ${baseGroupFragment}
`;

export const usersGroupFragment = gql`
  fragment usersGroupFragment on Group {
    id
    users {
      id
      email
      name
      isActive
    }
  }
`;

export const updateGroupFragment = gql`
  fragment updateGroupFragment on Group {
    ...baseGroupFragment
    ...usersGroupFragment
    permissions {
      ...permissionsFragment
    }
  }
  ${baseGroupFragment}
  ${usersGroupFragment}
  ${permissionsFragment}
`;
