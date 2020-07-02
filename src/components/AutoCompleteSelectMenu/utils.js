function _toFlat(menuItem, sort, parent) {
  const id = parent ? [parent, sort].join(":") : sort.toString();
  const flatMenuItem = {
    data: menuItem.data,
    id,
    label: menuItem.label,
    parent,
    sort,
    value: menuItem.value,
  };
  return [
    flatMenuItem,
    ...menuItem.children
      .map((child, childIndex) => _toFlat(child, childIndex, id))
      .reduce((acc, curr) => [...acc, ...curr], []),
  ];
}

export function toFlat(menu) {
  return menu
    .map((menuItem, menuItemIndex) => _toFlat(menuItem, menuItemIndex, null))
    .reduce((acc, curr) => [...acc, ...curr], []);
}

function _getMenuItemByPath(menuItem, path) {
  if (path.length === 0) {
    return menuItem;
  }
  return _getMenuItemByPath(menuItem.children[path[0]], path.slice(1));
}

export function getMenuItemByPath(menu, path) {
  return _getMenuItemByPath(menu[path[0]], path.slice(1));
}

export function validateMenuOptions(menu) {
  const values = toFlat(menu)
    .map((menuItem) => menuItem.value)
    .filter((value) => value !== undefined);
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues.length === values.length;
}

function _fromFlat(menu, flatMenuItem) {
  const children = menu
    .filter((menuItem) => menuItem.parent === flatMenuItem.id)
    .map((menuItem) => _fromFlat(menu, menuItem));

  return {
    children,
    data: flatMenuItem.data,
    label: flatMenuItem.label,
    value: flatMenuItem.value,
  };
}

export function fromFlat(menu) {
  return menu
    .filter((menuItem) => menuItem.parent === null)
    .map((menuItem) => _fromFlat(menu, menuItem));
}

export function getMenuItemByValue(menu, value) {
  const flatMenu = toFlat(menu);
  const flatMenuItem = flatMenu.find((menuItem) => menuItem.value === value);

  if (flatMenuItem === undefined) {
    throw new Error(`Value ${value} does not exist in menu`);
  }

  return _fromFlat(flatMenu, flatMenuItem);
}
