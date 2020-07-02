import React from "react";

import { maybe } from "@/utils";
import { useSelected } from "@/utils/hooks";

import { TableComponent } from "../../List/_components";

export const Table = (props) => {
  const {
    table,
    placeholder,
    bulkMutations = [],
    data: rawData,
    queryField,
    params,
    setParams,
    loading,
    refetch,
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
      action={table.action}
      notFoundName={placeholder}
      params={params}
      table={table}
      bulkMutations={bulkMutations}
      loading={loading}
      placeholder={placeholder}
      refetch={refetch}
    />
  );
};
