import gql from "graphql-tag";

import { PageInfoFragment } from "@/core/_graphql/fragments";

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
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: CollectionSortingInput
    $search: String
    $published: CollectionPublished
  ) {
    collections(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: { search: $search, published: $published }
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
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: CollectionSortingInput
    $search: String
    $sales: [ID]
    $notInSales: [ID]
    $vouchers: [ID]
    $notInVouchers: [ID]
  ) {
    collections(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
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
