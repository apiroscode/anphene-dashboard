import gql from "graphql-tag";

export const pageFragment = gql`
  fragment pageFragment on Page {
    id
    title
    slug
    isPublished
  }
`;

export const pageDetailFragment = gql`
  fragment pageDetailFragment on Page {
    ...pageFragment
    content
    isPublished
    publicationDate
    seoTitle
    seoDescription
  }
  ${pageFragment}
`;
