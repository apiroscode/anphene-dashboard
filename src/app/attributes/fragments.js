import gql from "graphql-tag";

const AttributeValueFragment = gql`
  fragment AttributeValueFragment on AttributeValue {
    id
    name
    value
    slug
  }
`;

export const SimpleAttributeFragment = gql`
  fragment SimpleAttributeFragment on Attribute {
    id
    name
    slug
  }
`;

export const AttributeFragment = gql`
  fragment AttributeFragment on Attribute {
    id
    name
    slug
    visibleInStorefront
    filterableInDashboard
    filterableInStorefront
  }
`;

export const AttributeDetailsFragment = gql`
  fragment AttributeDetailsFragment on Attribute {
    id
    name
    slug
    valueRequired
    visibleInStorefront
    filterableInDashboard
    filterableInStorefront
    availableInGrid
    storefrontSearchPosition
    inputType
    values {
      ...AttributeValueFragment
    }
  }
  ${AttributeValueFragment}
`;
