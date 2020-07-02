import gql from "graphql-tag";

export const errorFragment = gql`
  fragment errorFragment on Error {
    field
    message
  }
`;
