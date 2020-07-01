export const addAtIndex = (data, list, index) => {
  return [...list.slice(0, index), data, ...list.slice(index)];
};

export const remove = (data, list, compare) => {
  return list.filter((listElement) => !compare(listElement, data));
};

export const move = (data, list, compare, index) => {
  return addAtIndex(data, remove(data, list, compare), index);
};
