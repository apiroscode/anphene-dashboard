import gql from "graphql-tag";
import { productImageFragment } from "@/graphql/fragments/productsImages";

export const productListFragment = gql`
  fragment productListFragment on Product {
    id
    name
    thumbnail {
      url
    }
    productType {
      id
      name
    }
    isPublished
    slug
    pricing {
      discount
      priceRange {
        start
      }
    }
  }
`;

export const productDetailFragment = gql`
  fragment productDetailFragment on Product {
    id
    name
    slug
    description
    updatedAt

    seoTitle
    seoDescription

    publicationDate
    isPublished

    supplier {
      id
      name
    }
    category {
      id
      name
    }
    collections {
      id
      name
    }
    productType {
      id
      name
      hasVariants
    }
    attributes {
      attribute {
        id
        inputType
        slug
        name
        valueRequired
        values {
          id
          name
          slug
        }
      }
      values {
        id
        slug
        name
      }
    }
    images {
      ...productImageFragment
    }
    variants {
      id
      name
      sku
      cost
      price
      quantity
      trackInventory
      quantityAllocated
      weight
    }
  }
  ${productImageFragment}
`;
