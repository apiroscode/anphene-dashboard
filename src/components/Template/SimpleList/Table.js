import React from "react";

import { maybe } from "@/utils";

import { TableComponent } from "../List/TableComponent";
import { useSelected } from "../utils";

export const Table = (props) => {
  const {
    table,
    placeholder,
    bulkMutations = [],
    data: rawData,
    queryField,
    variables,
    setVariables,
    loading,
  } = props;

  const data = maybe(() => rawData?.[queryField]?.edges, []);
  const [
    selected,
    setSelected,
    isSelected,
    numSelected,
    handleAllClick,
    handleSingleClick,
  ] = useSelected(data);

  const dataCount = data.length;

  const sortHandler = (sortField) => {
    const oldSort = variables.sortDirection;
    let newSort;
    if (variables.sortField === sortField) {
      newSort = oldSort === "ASC" ? "DESC" : "ASC";
    } else {
      newSort = "ASC";
    }
    setVariables((prevState) => ({
      ...prevState,
      sortField,
      sortDirection: newSort,
    }));
  };

  const tableProps = {
    ...props,
    selected,
    setSelected,
    params: variables,
    sortHandler,
    data,
    isSelected,
    numSelected,
    bulkMutations,
    dataCount,
    handleAllClick,
    loading,
    table,
    handleSingleClick,
    action: table.action,
    notFoundName: placeholder,
  };
  return <TableComponent {...tableProps} />;
};
