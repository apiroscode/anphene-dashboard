import gql from "graphql-tag";
import { productImageFragment } from "@/graphql/fragments/productsImages";

export const variantFragment = gql`
  fragment variantFragment on ProductVariant {
    id
    name
    sku
    price
    cost
    trackInventory
    weight
    quantity
    quantityAllocated

    attributes {
      attribute {
        id
        name
        slug
        valueRequired
        values {
          id
          name
          slug
        }
      }
      values {
        id
        name
        slug
      }
    }

    images {
      id
      url
    }

    product {
      id
      name
      thumbnail {
        url
      }
      images {
        ...productImageFragment
      }
      variants {
        id
        name
        sku
        images {
          id
          url
        }
      }
    }
  }
  ${productImageFragment}
`;
