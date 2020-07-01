import gql from "graphql-tag";

export const GET_PRODUCT_IMAGE_BY_ID = gql`
  query GET_PRODUCT_IMAGE_BY_ID($productId: ID!, $imageId: ID!) {
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
