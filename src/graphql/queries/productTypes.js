import gql from "graphql-tag";

import {
  productTypeAttributeFragment,
  productTypeDetailFragment,
  productTypeFragment,
} from "@/graphql/fragments/productTypes";
import { filterVariable } from "@/graphql/fragments/pageInfo";

export const GET_PRODUCT_TYPES = gql`
  query GET_PRODUCT_TYPES(
    ${filterVariable.type("ProductTypeSortField")}
    $search: String, 
    $configurable: ProductTypeConfigurable
  ) {
    productTypes(
     ${filterVariable.vars}
    filter: { search: $search, configurable: $configurable }
    ) {
      edges {
        node { 
          ...productTypeFragment
        }
      }
    }
  }
  ${productTypeFragment}
`;

export const GET_PRODUCT_TYPE = gql`
  query GET_PRODUCT_TYPE($id: ID!) {
    productType(id: $id) {
      ...productTypeDetailFragment
    }
  }
  ${productTypeDetailFragment}
`;

export const GET_AVAILABLE_ATTRIBUTES = gql`
  query GET_AVAILABLE_ATTRIBUTES($id: ID!, $after: String, $inputType: AttributeTypeEnum) {
    productType(id: $id) {
      id
      availableAttributes(first: 10, after: $after, filter: { inputType: $inputType }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...productTypeAttributeFragment
          }
        }
      }
    }
  }
  ${productTypeAttributeFragment}
`;
