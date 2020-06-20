import React, { useMemo } from "react";

import { useObjectState, useQuery } from "@/utils/hooks";

import { DEFAULT_PAGE_SIZE } from "../constants";
import { optimizeParams } from "../utils";
import { Search } from "./Search";
import { Pagination } from "./Pagination";
import { Table } from "./Table";

export const SimpleList = (props) => {
  const {
    query,
    table,
    vars = {},
    useSearch = true,
    usePagination = true,
    bulkMutations = [],
    bulkLoading = false,
    placeholder,
    queryField,
  } = props;

  const [params, setParams] = useObjectState({
    search: undefined,
    before: undefined,
    after: undefined,
    pageSize: DEFAULT_PAGE_SIZE,
    sortDirection: table?.defaultSort?.direction,
    sortField: table?.defaultSort?.field,
  });

  const variables = useMemo(
    () => optimizeParams(params, { pageSize: params.before ? "last" : "first" }, []),
    [params]
  );

  const { data, loading: queryLoading } = useQuery(query, {
    variables: { ...variables, ...vars },
  });

  const baseProps = {
    params,
    setParams,
    loading: bulkLoading || queryLoading,
    placeholder,
    data,
    query,
    queryField,
    table,
    bulkMutations,
    variables,
    vars,
  };

  return (
    <div>
      {useSearch && <Search {...baseProps} />}
      <Table {...baseProps} />
      {usePagination && <Pagination {...baseProps} />}
    </div>
  );
};
