import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { saleFragment } from "@/graphql/fragments/sales";

export const CREATE_SALE = gql`
  mutation CREATE_SALE($input: SaleInput!) {
    saleCreate(input: $input) {
      errors {
        ...errorFragment
      }
      sale {
        ...saleFragment
      }
    }
  }
  ${errorFragment}
  ${saleFragment}
`;

export const UPDATE_SALE = gql`
  mutation UPDATE_SALE($id: ID!, $input: SaleInput!) {
    saleUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      sale {
        ...saleFragment
      }
    }
  }
  ${errorFragment}
  ${saleFragment}
`;

export const DELETE_SALE = gql`
  mutation DELETE_SALE($id: ID!) {
    saleDelete(id: $id) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_SALE = gql`
  mutation BULK_DELETE_SALE($ids: [ID]!) {
    saleBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;
