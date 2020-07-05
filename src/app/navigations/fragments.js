import gql from "graphql-tag";

export const MenuItemFragment = gql`
  fragment MenuItemFragment on MenuItem {
    id
    level
    name
    url
    sortOrder
    category {
      id
      name
    }
    collection {
      id
      name
    }
    page {
      id
      title
    }
  }
`;

export const MenuItemNestedFragment = gql`
  fragment MenuItemNestedFragment on MenuItem {
    ...MenuItemFragment
    children {
      ...MenuItemFragment
      children {
        ...MenuItemFragment
        children {
          ...MenuItemFragment
          children {
            ...MenuItemFragment
            children {
              ...MenuItemFragment
              children {
                ...MenuItemFragment
              }
            }
          }
        }
      }
    }
  }
  ${MenuItemFragment}
`;

export const SimpleMenuFragment = gql`
  fragment SimpleMenuFragment on Menu {
    id
    name
    isMainNavigation
    isSecondaryNavigation
  }
`;

export const MenuFragment = gql`
  fragment MenuFragment on Menu {
    ...SimpleMenuFragment
    items {
      id
    }
  }
  ${SimpleMenuFragment}
`;

export const MenuDetailsFragment = gql`
  fragment MenuDetailsFragment on Menu {
    ...SimpleMenuFragment
    items {
      ...MenuItemNestedFragment
    }
  }
  ${SimpleMenuFragment}
  ${MenuItemNestedFragment}
`;
