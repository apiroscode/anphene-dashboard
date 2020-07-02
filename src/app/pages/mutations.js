import gql from "graphql-tag";

import { ErrorFragment } from "@/components/_graphql/fragments";

import { PageDetailsFragment } from "./fragments";

export const CreatePage = gql`
  mutation CreatePage($input: PageInput!) {
    pageCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      page {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdatePage = gql`
  mutation UpdatePage($id: ID!, $input: PageInput!) {
    pageUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      page {
        ...PageDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${PageDetailsFragment}
`;

export const DeletePage = gql`
  mutation DeletePage($id: ID!) {
    pageDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeletePage = gql`
  mutation BulkDeletePage($ids: [ID]!) {
    pageBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkPublishPage = gql`
  mutation BulkPublishPage($ids: [ID]!, $isPublished: Boolean!) {
    pageBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;
