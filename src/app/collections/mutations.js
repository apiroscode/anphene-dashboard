import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { CollectionDetailsFragment } from "./fragments";

export const CreateCollection = gql`
  mutation CreateCollection($input: CollectionInput!) {
    collectionCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      collection {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateCollection = gql`
  mutation UpdateCollection($id: ID!, $input: CollectionInput!) {
    collectionUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      collection {
        ...CollectionDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${CollectionDetailsFragment}
`;

export const DeleteCollection = gql`
  mutation DeleteCollection($id: ID!) {
    collectionDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteCollection = gql`
  mutation BulkDeleteCollection($ids: [ID]!) {
    collectionBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkPublishCollection = gql`
  mutation BulkPublishCollection($ids: [ID]!, $isPublished: Boolean!) {
    collectionBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const CollectionAddProducts = gql`
  mutation CollectionAddProducts($collectionId: ID!, $products: [ID]!) {
    collectionAddProducts(collectionId: $collectionId, products: $products) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const CollectionRemoveProducts = gql`
  mutation CollectionRemoveProducts($collectionId: ID!, $products: [ID]!) {
    collectionRemoveProducts(collectionId: $collectionId, products: $products) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AssignCollectionHomepage = gql`
  mutation AssignCollectionHomepage($collection: ID) {
    assignCollectionHomepage(collection: $collection) {
      errors {
        ...ErrorFragment
      }
      collection {
        ...CollectionDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${CollectionDetailsFragment}
`;
