import { getPatch } from "fast-array-diff";

export const unknownTypeError = Error("Unknown type");

function treeToMap(tree, parent) {
  const childrenList = tree.map((node) => node.id);
  const childrenMaps = tree.map((node) => ({
    id: node.id,
    mappedNodes: treeToMap(node.children, node.id),
  }));

  return {
    [parent]: childrenList,
    ...childrenMaps.reduce(
      (acc, childMap) => ({
        ...acc,
        ...childMap.mappedNodes,
      }),
      {}
    ),
  };
}

export function getItemType(item) {
  if (item.category) {
    return "category";
  } else if (item.collection) {
    return "collection";
  } else if (item.page) {
    return "page";
  } else if (item.url) {
    return "url";
  } else {
    throw unknownTypeError;
  }
}

export function getItemId(item) {
  if (item.category) {
    return item.category.id;
  } else if (item.collection) {
    return item.collection.id;
  } else if (item.page) {
    return item.page.id;
  } else if (item.url) {
    return item.url;
  } else {
    throw unknownTypeError;
  }
}

export function getDiff(originalTree, newTree) {
  const originalMap = treeToMap(originalTree, "root");
  const newMap = treeToMap(newTree, "root");

  const diff = Object.keys(newMap).map((key) => {
    const originalNode = originalMap[key];
    const newNode = newMap[key];

    const patch = getPatch(originalNode, newNode);

    if (patch.length > 0) {
      const addedNode = patch.find((operation) => operation.type === "add");
      if (!!addedNode) {
        return {
          id: addedNode.items[0],
          parentId: key === "root" ? undefined : key,
          sortOrder: addedNode.newPos,
          type: "move",
        };
      }
    }
    return null;
  });

  return diff.find((d) => !!d);
}

export function getNodeData(item, onChange, onClick, onEdit) {
  return {
    children: item.children.map((child) => getNodeData(child, onChange, onClick, onEdit)),
    expanded: true,
    id: item.id,
    onChange,
    onClick: () => onClick(getItemId(item), getItemType(item)),
    onEdit: () => onEdit(item.id),
    title: item.name,
  };
}

export function getNodeQuantity(items) {
  return items.reduce((acc, curr) => acc + getNodeQuantity(curr.children), items.length);
}
