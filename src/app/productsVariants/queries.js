import gql from "graphql-tag";

import { ProductVariantDetailsFragment } from "./fragments";

export const GetVariant = gql`
  query GetVariant($id: ID!) {
    productVariant(id: $id) {
      ...ProductVariantDetailsFragment
    }
  }
  ${ProductVariantDetailsFragment}
`;

export const InitializeVariantCreate = gql`
  query InitializeVariantCreate($id: ID!) {
    product(id: $id) {
      id
      name
      getUniqueSku
      productType {
        id
        variantAttributes {
          id
          slug
          name
          valueRequired
          values {
            id
            name
            slug
          }
        }
      }
      thumbnail {
        url
      }
      variants {
        id
        name
        sku
        price
        cost
        trackInventory
        weight
        quantity
        images {
          id
          url
        }
      }
    }
  }
`;

export const GetProductVariants = gql`
  query GetProductVariants($id: ID!) {
    product(id: $id) {
      id
      getUniqueSku
      variants {
        id
      }
      productType {
        id
        name
        hasVariants
        variantAttributes {
          id
          name
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
