import React from "react";

import { useNavigate } from "react-router-dom";

import { maybe } from "@/utils";

import { useSelected } from "../utils";
import { TableComponent } from "./TableComponent";

export const Table = (props) => {
  const {
    table,
    bulkMutations = [],
    data: rawData,
    queryField,
    params,
    setParams,
    pluralAppName,
    loading,
  } = props;
  const navigate = useNavigate();

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
    const oldSort = params.sortDirection;
    let newSort;
    if (params.sortField === sortField) {
      newSort = oldSort === "ASC" ? "DESC" : "ASC";
    } else {
      newSort = "ASC";
    }
    setParams({
      ...params,
      sortField,
      sortDirection: newSort,
    });
  };

  const tableProps = {
    ...props,
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
    action: (node) => navigate(node.id),
    notFoundName: pluralAppName,
  };

  return <TableComponent {...tableProps} />;
};
