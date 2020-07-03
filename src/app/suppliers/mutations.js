import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";
import { SupplierDetailFragment } from "./fragments";

export const CreateSupplier = gql`
  mutation CreateSupplier($input: SupplierInput!) {
    supplierCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      supplier {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateSupplier = gql`
  mutation UpdateSupplier($id: ID!, $input: SupplierInput!) {
    supplierUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      supplier {
        ...SupplierDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${SupplierDetailFragment}
`;

export const DeleteSupplier = gql`
  mutation DeleteSupplier($id: ID!) {
    supplierDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteSupplier = gql`
  mutation BulkDeleteSupplier($ids: [ID]!) {
    supplierBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;
