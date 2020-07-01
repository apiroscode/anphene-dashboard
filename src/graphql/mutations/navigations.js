import gql from "graphql-tag";
import { errorFragment } from "@/graphql/fragments/base";
import { menuDetailsFragment } from "@/graphql/fragments/navigation";

export const CREATE_MENU = gql`
  mutation CREATE_MENU($input: MenuCreateInput!) {
    menuCreate(input: $input) {
      errors {
        ...errorFragment
      }
      menu {
        id
      }
    }
  }
  ${errorFragment}
`;

export const UPDATE_MENU = gql`
  mutation UPDATE_MENU($id: ID!, $input: MenuInput!) {
    menuUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      menu {
        id
        name
      }
    }
  }
  ${errorFragment}
`;

export const DELETE_MENU = gql`
  mutation DELETE_MENU($id: ID!) {
    menuDelete(id: $id) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const CREATE_MENU_ITEM = gql`
  mutation CREATE_MENU_ITEM($input: MenuItemCreateInput!) {
    menuItemCreate(input: $input) {
      errors {
        ...errorFragment
      }
      menuItem {
        id
        menu {
          ...menuDetailsFragment
        }
      }
    }
  }
  ${errorFragment}
  ${menuDetailsFragment}
`;

export const UPDATE_MENU_ITEM = gql`
  mutation UPDATE_MENU_ITEM($id: ID!, $input: MenuItemInput!) {
    menuItemUpdate(id: $id, input: $input) {
      errors {
        ...errorFragment
      }
      menuItem {
        id
        menu {
          ...menuDetailsFragment
        }
      }
    }
  }
  ${errorFragment}
  ${menuDetailsFragment}
`;

export const BULK_DELETE_MENU = gql`
  mutation BULK_DELETE_MENU($ids: [ID]!) {
    menuBulkDelete(ids: $ids) {
      errors {
        ...errorFragment
      }
    }
  }
  ${errorFragment}
`;

export const MOVE_ITEM = gql`
  mutation MOVE_ITEM($id: ID!, $sortOrder: Int!, $parentId: ID) {
    itemMove(id: $id, sortOrder: $sortOrder, parentId: $parentId) {
      errors {
        field
        message
      }
      menu {
        ...menuDetailsFragment
      }
    }
  }
  ${menuDetailsFragment}
`;

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    menuItemDelete(id: $id) {
      errors {
        field
        message
      }
      menuItem {
        id
        menu {
          ...menuDetailsFragment
        }
      }
    }
  }
  ${menuDetailsFragment}
`;
