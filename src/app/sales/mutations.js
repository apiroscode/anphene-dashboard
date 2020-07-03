import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { SaleFragment, SaleTotalCountFragment } from "./fragments";

export const CreateSale = gql`
  mutation CreateSale($input: SaleInput!) {
    saleCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      sale {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateSale = gql`
  mutation UpdateSale($id: ID!, $input: SaleInput!) {
    saleUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      sale {
        ...SaleFragment
      }
    }
  }
  ${ErrorFragment}
  ${SaleFragment}
`;

export const DeleteSale = gql`
  mutation DeleteSale($id: ID!) {
    saleDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteSale = gql`
  mutation BulkDeleteSale($ids: [ID]!) {
    saleBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AddSaleCatalogues = gql`
  mutation AddSaleCatalogues($id: ID!, $categories: [ID], $collections: [ID], $products: [ID]) {
    saleCataloguesAdd(
      id: $id
      input: { categories: $categories, collections: $collections, products: $products }
    ) {
      errors {
        ...ErrorFragment
      }
      sale {
        ...SaleTotalCountFragment
      }
    }
  }
  ${ErrorFragment}
  ${SaleTotalCountFragment}
`;

export const RemoveSaleCatalogues = gql`
  mutation RemoveSaleCatalogues($id: ID!, $categories: [ID], $collections: [ID], $products: [ID]) {
    saleCataloguesRemove(
      id: $id
      input: { categories: $categories, collections: $collections, products: $products }
    ) {
      errors {
        ...ErrorFragment
      }
      sale {
        ...SaleTotalCountFragment
      }
    }
  }
  ${ErrorFragment}
  ${SaleTotalCountFragment}
`;
