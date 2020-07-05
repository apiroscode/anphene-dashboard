import gql from "graphql-tag";

export const SimpleCollectionsFragment = gql`
  fragment SimpleCollectionsFragment on Query {
    collections(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    name
    isPublished
    featureOnHomepage
    products {
      totalCount
    }
  }
`;

export const CollectionDetailsFragment = gql`
  fragment CollectionDetailsFragment on Collection {
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
    featureOnHomepage
  }
`;
