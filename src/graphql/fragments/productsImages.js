import gql from "graphql-tag";

export const productImageFragment = gql`
  fragment productImageFragment on ProductImage {
    id
    sortOrder
    alt
    url
  }
`;
