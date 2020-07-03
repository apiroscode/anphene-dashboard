import gql from "graphql-tag";

export const ProductImageFragment = gql`
  fragment ProductImageFragment on ProductImage {
    id
    sortOrder
    alt
    url
  }
`;
