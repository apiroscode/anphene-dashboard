export function findNode(tree, id) {
  const foundNodeIndex = tree.findIndex((node) => node.id === id);
  if (tree.length === 0) {
    return [null];
  }
  if (foundNodeIndex !== -1) {
    return [foundNodeIndex];
  }
  const nodeMap = tree.map((node, nodeIndex) => [nodeIndex, ...findNode(node.children, id)]);
  return nodeMap.find((path) => path[path.length - 1] !== null) || [null];
}

export function getNode(tree, path) {
  if (path.length === 1) {
    return tree[path[0]];
  }
  return getNode([...tree[path[0]].children], path.slice(1));
}

function removeNode(tree, path) {
  const removeIndex = path[0];

  if (path.length === 1) {
    return [...tree.slice(0, removeIndex), ...tree.slice(removeIndex + 1)];
  }

  const newTree = [...tree];
  newTree[removeIndex] = {
    ...tree[path[0]],
    children: removeNode(tree[path[0]].children, path.slice(1)),
  };

  return newTree;
}

function insertNode(tree, path, node, position) {
  if (path.length === 0) {
    return [...tree.slice(0, position), node, ...tree.slice(position)];
  }

  if (path[0] in tree) {
    tree[path[0]].children = insertNode(tree[path[0]].children, path.slice(1), node, position);
  }
  return tree;
}

function removeNodeAndChildren(tree, operation) {
  const sourcePath = findNode(tree, operation.id);
  const node = getNode(tree, sourcePath);

  if (node.children) {
    const treeAfterChildrenRemoval = node.children.reduce(
      (acc, child) =>
        removeNodeAndChildren(acc, {
          id: child.id,
          type: "remove",
        }),
      tree
    );
    return removeNode(treeAfterChildrenRemoval, sourcePath);
  }
  return removeNode(tree, sourcePath);
}

function permuteNode(tree, permutation) {
  const sourcePath = findNode(tree, permutation.id);
  const node = getNode(tree, sourcePath);

  const treeAfterRemoval = removeNode(tree, sourcePath);

  const targetPath = permutation.parentId ? findNode(treeAfterRemoval, permutation.parentId) : [];

  return insertNode(treeAfterRemoval, targetPath, node, permutation.sortOrder);
}

function executeOperation(tree, operation) {
  return operation.type === "move"
    ? permuteNode(tree, operation)
    : removeNodeAndChildren(tree, operation);
}

export function computeTree(tree, operations) {
  return operations.reduce(
    (acc, operation) => executeOperation(acc, operation),
    // FIXME: 😡
    JSON.parse(JSON.stringify(tree))
  );
}
