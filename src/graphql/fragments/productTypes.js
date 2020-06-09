import gql from "graphql-tag";

export const productTypeAttributeFragment = gql`
  fragment productTypeAttributeFragment on Attribute {
    id
    name
    slug
  }
`;

export const productTypeFragment = gql`
  fragment productTypeFragment on ProductType {
    id
    name
    hasVariants
  }
`;

export const productTypeDetailFragment = gql`
  fragment productTypeDetailFragment on ProductType {
    ...productTypeFragment
    productAttributes {
      ...productTypeAttributeFragment
    }
    variantAttributes {
      ...productTypeAttributeFragment
    }
  }
  ${productTypeFragment}
  ${productTypeAttributeFragment}
`;
