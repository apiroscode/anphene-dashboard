import React from "react";

import { useNavigate } from "react-router-dom";

import { maybe } from "@/utils";
import { useSelected } from "@/utils/hooks";

import { TableComponent } from "./TableComponent";

export const Table = (props) => {
  const {
    table,
    bulkMutations = [],
    data: rawData,
    queryField,
    params,
    setParams,
    appName,
    pluralAppName,
    loading,
    placeholder,
    refetch,
  } = props;

  const navigate = useNavigate();
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
    setParams({
      sortField,
      sortDirection: newSort,
    });
  };

  return (
    <TableComponent
      selected={selected}
      setSelected={setSelected}
      isSelected={isSelected}
      numSelected={numSelected}
      handleAllClick={handleAllClick}
      handleSingleClick={handleSingleClick}
      data={data}
      dataCount={dataCount}
      sortHandler={sortHandler}
      action={(node) => navigate(node.id)}
      notFoundName={pluralAppName}
      params={params}
      table={table}
      bulkMutations={bulkMutations}
      loading={loading}
      appName={appName}
      pluralAppName={pluralAppName}
      placeholder={placeholder}
      refetch={refetch}
    />
  );
};
