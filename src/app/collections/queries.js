import gql from "graphql-tag";

import { PageInfoFragment, sorterPagination } from "@/components/_graphql/fragments";

import { CollectionDetailsFragment, CollectionFragment } from "./fragments";

export const GetCollection = gql`
  query GetCollection($id: ID!) {
    collection(id: $id) {
      ...CollectionDetailsFragment
    }
  }
  ${CollectionDetailsFragment}
`;

export const GetCollections = gql`
  query GetCollections(
    ${sorterPagination.type("CollectionSortField")}
    $search: String
    $published: CollectionPublished  
  ) {
    collections(
      ${sorterPagination.vars}, 
      filter: { search: $search, published: $published}
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${CollectionFragment}
`;

export const GetSimpleCollections = gql`
  query GetSimpleCollections(
    ${sorterPagination.type("CollectionSortField")}
    $search: String
    $sales: [ID]
    $notInSales: [ID]
    $vouchers: [ID]
    $notInVouchers: [ID]
  ) {
    collections(
      ${sorterPagination.vars}, 
      filter: {
        search: $search
        sales: $sales
        notInSales: $notInSales
        vouchers: $vouchers
        notInVouchers: $notInVouchers
      }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${CollectionFragment}
`;
