import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { collectionFragment, collectionDetailFragment } from "@/graphql/fragments/collections";

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
