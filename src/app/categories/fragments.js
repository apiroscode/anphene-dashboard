import gql from "graphql-tag";

export const SimpleCategoriesFragment = gql`
  fragment SimpleCategoriesFragment on Query {
    categories(first: 100) {
      edges {
        node {
          id
          name
          level
        }
      }
    }
  }
`;

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
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

export const CategoryDetailsFragment = gql`
  fragment CategoryDetailsFragment on Category {
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
