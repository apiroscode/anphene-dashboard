import { useState } from "react";

export const useSelected = (data) => {
  const [selected, setSelected] = useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const numSelected = selected.length;

  const handleAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = data.map((item) => item.node.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSingleClick = (e, id) => {
    e.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return [selected, setSelected, isSelected, numSelected, handleAllClick, handleSingleClick];
};

export const paginate = (pageInfo, params, setParams) => {
  const loadNextPage = () => {
    setParams({
      after: pageInfo.endCursor,
      before: undefined,
    });
  };

  const loadPreviousPage = () => {
    setParams({
      after: undefined,
      before: pageInfo.startCursor,
    });
  };

  const newPageInfo = pageInfo
    ? {
        ...pageInfo,
        hasNextPage: !!params.before || pageInfo.hasNextPage,
        hasPreviousPage: !!params.after || pageInfo.hasPreviousPage,
      }
    : undefined;

  return { loadNextPage, loadPreviousPage, pageInfo: newPageInfo };
};

export const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
