import gql from "graphql-tag";
import { ErrorFragment } from "@/core/_graphql/fragments";
import { VoucherDetailsFragment, VoucherTotalCountFragment } from "./fragments";

export const CreateVoucher = gql`
  mutation CreateVoucher($input: VoucherInput!) {
    voucherCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      voucher {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateVoucher = gql`
  mutation UpdateVoucher($id: ID!, $input: VoucherInput!) {
    voucherUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      voucher {
        ...VoucherDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${VoucherDetailsFragment}
`;

export const DeleteVoucher = gql`
  mutation DeleteVoucher($id: ID!) {
    voucherDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteVoucher = gql`
  mutation BulkDeleteVoucher($ids: [ID]!) {
    voucherBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AddVoucherCatalogues = gql`
  mutation AddVoucherCatalogues($id: ID!, $categories: [ID], $collections: [ID], $products: [ID]) {
    voucherCataloguesAdd(
      id: $id
      input: { categories: $categories, collections: $collections, products: $products }
    ) {
      errors {
        ...ErrorFragment
      }
      voucher {
        ...VoucherTotalCountFragment
      }
    }
  }
  ${ErrorFragment}
  ${VoucherTotalCountFragment}
`;

export const RemoveVoucherCatalogues = gql`
  mutation RemoveVoucherCatalogues(
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
        ...ErrorFragment
      }
      voucher {
        ...VoucherTotalCountFragment
      }
    }
  }
  ${ErrorFragment}
  ${VoucherTotalCountFragment}
`;
