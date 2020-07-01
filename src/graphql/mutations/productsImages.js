import gql from "graphql-tag";
import { productImageFragment } from "@/graphql/fragments/productsImages";
import { errorFragment } from "@/graphql/fragments/base";

export const CREATE_PRODUCT_IMAGE = gql`
  mutation CREATE_PRODUCT_IMAGE($input: ProductImageCreateInput!) {
    productImageCreate(input: $input) {
      errors {
        ...errorFragment
      }
      product {
        id
        images {
          ...productImageFragment
        }
      }
    }
  }
  ${errorFragment}
  ${productImageFragment}
`;

export const UPDATE_PRODUCT_IMAGE = gql`
  mutation UPDATE_PRODUCT_IMAGE($id: ID!, $alt: String) {
    productImageUpdate(id: $id, input: { alt: $alt }) {
      errors {
        ...errorFragment
      }
      image {
        id
        alt
      }
    }
  }
  ${errorFragment}
`;

export const DELETE_PRODUCT_IMAGE = gql`
  mutation DELETE_PRODUCT_IMAGE($id: ID!) {
    productImageDelete(id: $id) {
      errors {
        ...errorFragment
      }
      product {
        id
        images {
          ...productImageFragment
        }
      }
    }
  }
  ${errorFragment}
  ${productImageFragment}
`;

export const REORDER_PRODUCT_IMAGE = gql`
  mutation REORDER_PRODUCT_IMAGE($imagesIds: [ID]!, $productId: ID!) {
    productImageReorder(imagesIds: $imagesIds, productId: $productId) {
      product {
        id
        images {
          ...productImageFragment
        }
      }
    }
  }
  ${productImageFragment}
`;
