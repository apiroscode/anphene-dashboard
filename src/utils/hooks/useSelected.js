import { useState } from "react";

export const useSelected = (data) => {
  const [selected, setSelected] = useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const numSelected = selected.length;

  const handleAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = data.map((item) => item?.node?.id || item?.id);
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

  return { selected, setSelected, isSelected, numSelected, handleAllClick, handleSingleClick };
};
