import gql from "graphql-tag";
import { variantFragment } from "@/graphql/fragments/productVariants";

export const GET_VARIANT = gql`
  query GET_VARIANT($id: ID!) {
    productVariant(id: $id) {
      ...variantFragment
    }
  }
  ${variantFragment}
`;

export const GET_PRODUCT_VARIANT_DATA = gql`
  query GET_PRODUCT_VARIANT_DATA($id: ID!) {
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
