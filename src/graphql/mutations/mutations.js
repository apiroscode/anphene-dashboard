import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { pageDetailFragment } from "@/graphql/fragments/pages";

export const CREATE_PAGE = gql`
  mutation CREATE_PAGE($input: PageInput!) {
    pageCreate(input: $input) {
      errors {
        ...errorFragment
      }
      page {
        id
      }
    }
  }
  ${errorFragment}
`;

export const UPDATE_PAGE = gql`
  mutation UPDATE_PAGE($id: ID!, $input: PageInput!) {
    pageUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      page {
        ...pageDetailFragment
      }
    }
  }
  ${errorFragment}
  ${pageDetailFragment}
`;

export const DELETE_PAGE = gql`
  mutation DELETE_PAGE($id: ID!) {
    pageDelete(id: $id) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_PAGE = gql`
  mutation BULK_DELETE_PAGE($ids: [ID]!) {
    pageBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_PUBLISH_PAGE = gql`
  mutation BULK_PUBLISH_PAGE($ids: [ID]!, $isPublished: Boolean!) {
    pageBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;
