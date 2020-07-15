import gql from "graphql-tag";
import { ProductImageFragment } from "../productsImages/fragments";

export const ProductVariantDetailsFragment = gql`
  fragment ProductVariantDetailsFragment on ProductVariant {
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
        ...ProductImageFragment
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
  ${ProductImageFragment}
`;
