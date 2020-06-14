import React, { useState, useMemo, useEffect } from "react";

import { useQuery } from "@/utils/hooks";

import { Search } from "./Search";
import { Pagination } from "./Pagination";
import { Table } from "./Table";

const DEFAULT_PAGE_SIZE = 25;

export const SimpleList = (props) => {
  const {
    query,
    table,
    vars = {},
    useSearch = true,
    usePagination = true,
    bulkLoading = false,
  } = props;
  const rawVariables = useMemo(
    () => ({
      ...vars,
      ...(table.defaultSort
        ? { sortDirection: table.defaultSort.direction, sortField: table.defaultSort.field }
        : {}),
      ...(useSearch ? { search: undefined } : {}),
      ...(usePagination
        ? {
            first: DEFAULT_PAGE_SIZE,
            last: undefined,
            before: undefined,
            after: undefined,
          }
        : {}),
    }),
    [vars, table, useSearch, usePagination]
  );
  const [variables, setVariables] = useState(rawVariables);
  const { data, loading: queryLoading } = useQuery(query, { variables });

  useEffect(() => {
    setVariables((prevState) => ({
      ...prevState,
      ...vars,
    }));
  }, [vars]);

  const baseProps = {
    ...props,
    loading: bulkLoading || queryLoading,
    rawVariables,
    variables,
    setVariables,
    data,
  };

  return (
    <div>
      {useSearch && <Search {...baseProps} />}
      <Table {...baseProps} />
      {usePagination && <Pagination {...baseProps} />}
    </div>
  );
};
