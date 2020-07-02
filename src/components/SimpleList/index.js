import React, { useEffect, useMemo } from "react";

import { useObjectState, useQuery } from "@/utils/hooks";

import { optimizeParams } from "../List/utils";

import { Pagination, Search, Table } from "./_components";

const DEFAULT_PAGE_SIZE = 10;
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
    setListProps,
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

  const { data, loading: queryLoading, refetch } = useQuery(query, {
    variables: { ...variables, ...vars },
  });
  const loading = bulkLoading || queryLoading;

  useEffect(() => {
    if (setListProps) {
      setListProps({ ...variables, ...vars });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables, setListProps]);

  return (
    <div>
      {useSearch && (
        <Search
          params={params}
          setParams={setParams}
          loading={loading}
          placeholder={placeholder}
        />
      )}
      <Table
        table={table}
        placeholder={placeholder}
        bulkMutations={bulkMutations}
        data={data}
        queryField={queryField}
        params={params}
        setParams={setParams}
        loadig={loading}
        refetch={refetch}
      />
      {usePagination && (
        <Pagination
          data={data}
          queryField={queryField}
          loading={loading}
          params={params}
          setParams={setParams}
        />
      )}
    </div>
  );
};
