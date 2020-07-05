import gql from "graphql-tag";

import { AuthLoginFragment } from "./fragments";

export const Initialize = gql`
  query Initialize {
    me {
      ...AuthLoginFragment
    }
  }
  ${AuthLoginFragment}
`;

export const GetProvinces = gql`
  query GetProvinces {
    provinces(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const GetCities = gql`
  query GetCities($province: ID) {
    cities(first: 100, filter: { province: $province }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const GetDistricts = gql`
  query GetDistricts($city: ID) {
    subDistricts(first: 100, filter: { city: $city }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
