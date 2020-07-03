import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

import { AttributeFragment, ProductTypeDetailsFragment, ProductTypeFragment } from "./fragments";

export const GetProductType = gql`
  query GetProductType($id: ID!) {
    productType(id: $id) {
      ...ProductTypeDetailsFragment
    }
  }
  ${ProductTypeDetailsFragment}
`;

export const GetProductTypes = gql`
  query GetProductTypes(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: ProductTypeSortingInput
    $search: String
    $configurable: ProductTypeConfigurable
  ) {
    productTypes(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: { search: $search, configurable: $configurable }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...ProductTypeFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${ProductTypeFragment}
`;

export const GetAvailableAttributes = gql`
  query GetAvailableAttributes($id: ID!, $after: String, $inputType: AttributeTypeEnum) {
    productType(id: $id) {
      id
      availableAttributes(first: 10, after: $after, filter: { inputType: $inputType }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...AttributeFragment
          }
        }
      }
    }
  }
  ${AttributeFragment}
`;
