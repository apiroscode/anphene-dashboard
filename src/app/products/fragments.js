import gql from "graphql-tag";

export const ProductFragment = gql`
  fragment ProductFragment on Product {
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

export const ProductDetailsFragment = gql`
  fragment ProductDetailsFragment on Product {
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
      ...ProductImageFragment
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
`;
