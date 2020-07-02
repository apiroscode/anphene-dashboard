import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { supplierDetailFragment } from "@/graphql/fragments/suppliers";

export const CREATE_SUPPLIER = gql`
  mutation CREATE_SUPPLIER($input: SupplierInput!) {
    supplierCreate(input: $input) {
      errors {
        ...errorFragment
      }
      supplier {
        ...supplierDetailFragment
      }
    }
  }
  ${errorFragment}
  ${supplierDetailFragment}
`;

export const UPDATE_SUPPLIER = gql`
  mutation UPDATE_SUPPLIER($id: ID!, $input: SupplierInput!) {
    supplierUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      supplier {
        ...supplierDetailFragment
      }
    }
  }
  ${errorFragment}
  ${supplierDetailFragment}
`;

export const DELETE_SUPPLIER = gql`
  mutation DELETE_SUPPLIER($id: ID!) {
    supplierDelete(id: $id) {
      errors {
        ...errorFragment
      }
      supplier {
        ...supplierDetailFragment
      }
    }
  }
  ${errorFragment}
  ${supplierDetailFragment}
`;

export const BULK_DELETE_SUPPLIERS = gql`
  mutation BULK_DELETE_SUPPLIERS($ids: [ID]!) {
    supplierBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;
