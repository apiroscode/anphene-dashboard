import gql from "graphql-tag";

export const valueFragment = gql`
  fragment valueFragment on AttributeValue {
    id
    name
    value
    slug
  }
`;

export const attributeValuesFragment = gql`
  fragment attributeValuesFragment on Attribute {
    id
    values {
      ...valueFragment
    }
  }
  ${valueFragment}
`;

export const attributeFragment = gql`
  fragment attributeFragment on Attribute {
    id
    name
    slug
    valueRequired
    visibleInStorefront
    filterableInStorefront
    filterableInDashboard
    availableInGrid
    storefrontSearchPosition
    inputType
  }
`;

export const attributeDetailFragment = gql`
  fragment attributeDetailFragment on Attribute {
    ...attributeFragment
    ...attributeValuesFragment
  }
  ${attributeFragment}
  ${attributeValuesFragment}
`;
