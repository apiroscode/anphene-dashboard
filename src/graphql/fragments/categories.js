import gql from "graphql-tag";

export const categoryListFragment = gql`
  fragment categoryListFragment on Category {
    id
    name
    children {
      totalCount
    }
    products {
      totalCount
    }
  }
`;

export const categoryDetailFragment = gql`
  fragment categoryDetailFragment on Category {
    id
    name
    description
    backgroundImage {
      url
      alt
    }
    seoTitle
    seoDescription
    parent {
      id
      name
    }
  }
`;
