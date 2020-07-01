import React from "react";

import { maybe } from "@/utils";
import { useSelected } from "@/utils/hooks";

import { TableComponent } from "../List/TableComponent";

export const Table = (props) => {
  const {
    table,
    query,
    placeholder,
    bulkMutations = [],
    data: rawData,
    queryField,
    params,
    setParams,
    loading,
    variables,
    vars,
  } = props;

  const data = maybe(() => rawData?.[queryField]?.edges, []);

  const {
    selected,
    setSelected,
    isSelected,
    numSelected,
    handleAllClick,
    handleSingleClick,
  } = useSelected(data);

  const dataCount = data.length;

  const sortHandler = (sortField) => {
    const oldSort = params.sortDirection;
    let newSort;
    if (params.sortField === sortField) {
      newSort = oldSort === "ASC" ? "DESC" : "ASC";
    } else {
      newSort = "ASC";
    }
    setParams({ sortField, sortDirection: newSort });
  };

  const tableProps = {
    query,
    selected,
    setSelected,
    params,
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
    placeholder,
    variables,
    vars,
    action: table.action,
    notFoundName: placeholder,
  };
  return <TableComponent {...tableProps} />;
};
