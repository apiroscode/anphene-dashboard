import gql from "graphql-tag";

export const GetProductImageById = gql`
  query GetProductImageById($productId: ID!, $imageId: ID!) {
    product(id: $productId) {
      id
      name
      mainImage: imageById(id: $imageId) {
        id
        alt
        url
      }
      images {
        id
        alt
        url(size: 48)
      }
    }
  }
`;
