import gql from "graphql-tag";

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
