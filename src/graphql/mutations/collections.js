import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { collectionDetailFragment, collectionFragment } from "@/graphql/fragments/collections";

export const CREATE_COLLECTION = gql`
  mutation CREATE_COLLECTION($input: CollectionInput!) {
    collectionCreate(input: $input) {
      errors {
        ...errorFragment
      }
      collection {
        ...collectionFragment
      }
    }
  }
  ${errorFragment}
  ${collectionFragment}
`;

export const UPDATE_COLLECTION = gql`
  mutation UPDATE_COLLECTION($id: ID!, $input: CollectionInput!) {
    collectionUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      collection {
        ...collectionDetailFragment
      }
    }
  }
  ${errorFragment}
  ${collectionDetailFragment}
`;

export const DELETE_COLLECTION = gql`
  mutation DELETE_COLLECTION($id: ID!) {
    collectionDelete(id: $id) {
      errors {
        ...errorFragment
      }
      collection {
        ...collectionFragment
      }
    }
  }
  ${errorFragment}
  ${collectionFragment}
`;

export const BULK_DELETE_COLLECTION = gql`
  mutation BULK_DELETE_COLLECTION($ids: [ID]!) {
    collectionBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
      count
    }
  }
  ${errorFragment}
`;

export const BULK_PUBLISH_COLLECTION = gql`
  mutation BULK_PUBLISH_COLLECTION($ids: [ID]!, $isPublished: Boolean!) {
    collectionBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        ...errorFragment
      }
      count
    }
  }
  ${errorFragment}
`;

export const COLLECTION_ADD_PRODUCTS = gql`
  mutation COLLECTION_ADD_PRODUCTS($collectionId: ID!, $products: [ID]!) {
    collectionAddProducts(collectionId: $collectionId, products: $products) {
      errors {
        field
        message
      }
    }
  }
`;
export const COLLECTION_REMOVE_PRODUCTS = gql`
  mutation COLLECTION_REMOVE_PRODUCTS($collectionId: ID!, $products: [ID]!) {
    collectionRemoveProducts(collectionId: $collectionId, products: $products) {
      errors {
        field
        message
      }
    }
  }
`;
