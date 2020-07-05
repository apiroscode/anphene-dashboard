import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { MenuDetailsFragment, SimpleMenuFragment } from "./fragments";

export const CreateMenu = gql`
  mutation CreateMenu($input: MenuCreateInput!) {
    menuCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      menu {
        id
      }
    }
  }
  ${ErrorFragment}
`;

export const UpdateMenu = gql`
  mutation UpdateMenu($id: ID!, $input: MenuInput!) {
    menuUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      menu {
        ...SimpleMenuFragment
      }
    }
  }
  ${ErrorFragment}
  ${SimpleMenuFragment}
`;

export const DeleteMenu = gql`
  mutation DeleteMenu($id: ID!) {
    menuDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const BulkDeleteMenu = gql`
  mutation BulkDeleteMenu($ids: [ID]!) {
    menuBulkDelete(ids: $ids) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const AssignNavigation = gql`
  mutation AssignNavigation($menu: ID, $navigationType: NavigationType!) {
    assignNavigation(menu: $menu, navigationType: $navigationType) {
      errors {
        ...ErrorFragment
      }
      menu {
        ...SimpleMenuFragment
      }
    }
  }
  ${ErrorFragment}
  ${SimpleMenuFragment}
`;

export const CreateMenuItem = gql`
  mutation CreateMenuItem($input: MenuItemCreateInput!) {
    menuItemCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      menuItem {
        id
        menu {
          ...MenuDetailsFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${MenuDetailsFragment}
`;

export const UpdateMenuItem = gql`
  mutation UpdateMenuItem($id: ID!, $input: MenuItemInput!) {
    menuItemUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      menuItem {
        id
        menu {
          ...MenuDetailsFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${MenuDetailsFragment}
`;

export const DeleteMenuItem = gql`
  mutation DeleteMenuItem($id: ID!) {
    menuItemDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
      menuItem {
        id
        menu {
          ...MenuDetailsFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${MenuDetailsFragment}
`;

export const MoveMenuItem = gql`
  mutation MoveMenuItem($id: ID!, $sortOrder: Int!, $parentId: ID) {
    menuItemMove(id: $id, sortOrder: $sortOrder, parentId: $parentId) {
      errors {
        ...ErrorFragment
      }
      menu {
        ...MenuDetailsFragment
      }
    }
  }
  ${ErrorFragment}
  ${MenuDetailsFragment}
`;
