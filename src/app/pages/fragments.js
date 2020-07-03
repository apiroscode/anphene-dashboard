import gql from "graphql-tag";

export const SimplePagesFragment = gql`
  fragment SimplePagesFragment on Query {
    pages(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

export const PageFragment = gql`
  fragment PageFragment on Page {
    id
    title
    slug
    isPublished
  }
`;

export const PageDetailsFragment = gql`
  fragment PageDetailsFragment on Page {
    id
    title
    slug
    isPublished
    content
    isPublished
    publicationDate
    seoTitle
    seoDescription
  }
`;
