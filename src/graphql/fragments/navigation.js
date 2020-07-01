import gql from "graphql-tag";

const menuItemFragment = gql`
  fragment menuItemFragment on MenuItem {
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

const menuItemNestedFragment = gql`
  fragment menuItemNestedFragment on MenuItem {
    ...menuItemFragment
    children {
      ...menuItemFragment
      children {
        ...menuItemFragment
        children {
          ...menuItemFragment
          children {
            ...menuItemFragment
            children {
              ...menuItemFragment
              children {
                ...menuItemFragment
              }
            }
          }
        }
      }
    }
  }
  ${menuItemFragment}
`;

export const menuDetailsFragment = gql`
  fragment menuDetailsFragment on Menu {
    id
    name
    items {
      ...menuItemNestedFragment
    }
  }
  ${menuItemNestedFragment}
`;
