import gql from "graphql-tag";

import { SimpleAttributeFragment } from "../attributes/fragments";

export const SimpleProductTypesFragment = gql`
  fragment SimpleProductTypesFragment on Query {
    productTypes(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const ProductTypesFragment = gql`
  fragment ProductTypesFragment on Query {
    productTypes(first: 100) {
      edges {
        node {
          id
          name
          hasVariants
          productAttributes {
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
        }
      }
    }
  }
`;

export const ProductTypeFragment = gql`
  fragment ProductTypeFragment on ProductType {
    id
    name
    hasVariants
  }
`;

export const ProductTypeDetailsFragment = gql`
  fragment ProductTypeDetailsFragment on ProductType {
    id
    name
    hasVariants
    productAttributes {
      ...SimpleAttributeFragment
    }
    variantAttributes {
      ...SimpleAttributeFragment
    }
  }
  ${SimpleAttributeFragment}
`;
