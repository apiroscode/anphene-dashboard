import gql from "graphql-tag";

export const collectionFragment = gql`
  fragment collectionFragment on Collection {
    id
    name
    isPublished
  }
`;

export const collectionDetailFragment = gql`
  fragment collectionDetailFragment on Collection {
    id
    name
    description
    seoTitle
    seoDescription
    isPublished
    backgroundImage {
      url
      alt
    }
    publicationDate
    isPublished
  }
`;
