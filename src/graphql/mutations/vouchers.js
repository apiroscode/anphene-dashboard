import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import {
  voucherDetailFragment,
  voucherFragment,
  voucherTotalCountFragment,
} from "@/graphql/fragments/vouchers";

export const CREATE_VOUCHER = gql`
  mutation CREATE_VOUCHER($input: VoucherInput!) {
    voucherCreate(input: $input) {
      errors {
        ...errorFragment
      }
      voucher {
        ...voucherFragment
      }
    }
  }
  ${errorFragment}
  ${voucherFragment}
`;

export const UPDATE_VOUCHER = gql`
  mutation UPDATE_VOUCHER($id: ID!, $input: VoucherInput!) {
    voucherUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      voucher {
        ...voucherDetailFragment
      }
    }
  }
  ${errorFragment}
  ${voucherDetailFragment}
`;

export const DELETE_VOUCHER = gql`
  mutation DELETE_VOUCHER($id: ID!) {
    voucherDelete(id: $id) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const BULK_DELETE_VOUCHER = gql`
  mutation BULK_DELETE_VOUCHER($ids: [ID]!) {
    voucherBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const ADD_VOUCHER_CATALOGUES = gql`
  mutation ADD_VOUCHER_CATALOGUES(
    $id: ID!
    $categories: [ID]
    $collections: [ID]
    $products: [ID]
  ) {
    voucherCataloguesAdd(
      id: $id
      input: { categories: $categories, collections: $collections, products: $products }
    ) {
      errors {
        field
        message
      }
      voucher {
        ...voucherTotalCountFragment
      }
    }
  }
  ${voucherTotalCountFragment}
`;

export const REMOVE_VOUCHER_CATALOGUES = gql`
  mutation REMOVE_VOUCHER_CATALOGUES(
    $id: ID!
    $categories: [ID]
    $collections: [ID]
    $products: [ID]
  ) {
    voucherCataloguesRemove(
      id: $id
      input: { categories: $categories, collections: $collections, products: $products }
    ) {
      errors {
        field
        message
      }
      voucher {
        ...voucherTotalCountFragment
      }
    }
  }
  ${voucherTotalCountFragment}
`;
