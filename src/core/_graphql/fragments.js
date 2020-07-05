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

export const AddressFragment = gql`
  fragment AddressFragment on Address {
    id
    name
    phone
    streetAddress
    postalCode
    subDistrict {
      id
      name
      city {
        id
        name
        province {
          id
          name
        }
      }
    }
  }
`;
