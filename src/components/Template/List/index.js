import React, { useEffect, useMemo, useState } from "react";

import clsx from "clsx";
import { useStoreActions } from "easy-peasy";
import pluralize from "pluralize";

import { useQuery } from "@apollo/react-hooks";
import { Card, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { maybe, paginate, renameKeys } from "@/utils";
import { useLocalStorage, useQS } from "@/utils/hooks";

import { Header } from "../Header";

import { CreateButton } from "./CreateButton";
import { FilterButton } from "./FilterButton";
import { FilterSearch } from "./FilterSearch";
import { FilterSave } from "./FilterSave";
import { Table } from "./Table";
import { Pagination } from "./Pagination";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    tabs: { padding: theme.spacing(0, 3), borderBottom: `1px solid ${theme.palette.divider}` },
    filter: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1, 3),
      borderBottom: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    filterStyle: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
        marginLeft: 0,
      },
    },
    filterSearch: {
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  }),
  { name: "TemplateListIndex" }
);

export const List = (props) => {
  const {
    appName,
    query,
    queryField,
    filters = [],
    table,
    isCreatable = true,
    useSearch = true,
    usePagination = true,
    actions = [],
    bulkLoading = false,
    storageKey = queryField,
  } = props;
  const classes = useStyles({ totalFilter: 0 });
  const pluralAppName = pluralize(appName);
  const toggleLoading = useStoreActions((actions) => actions.app.toggleLoading);
  const [storageFilter, setStorageFilter] = useLocalStorage(`${storageKey}`, []);
  const [tabValue, setTabValue] = useState("all");

  const filterVariables = [...(useSearch ? ["search"] : []), ...filters.map((item) => item.field)];
  const [params, setParams] = useQS(
    [
      ...(table.defaultSort ? ["sortDirection", "sortField"] : []),
      ...(usePagination ? ["before", "after", "pageSize"] : []),
      ...filterVariables,
    ],
    {
      ...(table.defaultSort
        ? { sortDirection: table.defaultSort.direction, sortField: table.defaultSort.field }
        : {}),
      ...(usePagination ? { pageSize: 25 } : {}),
    }
  );
  const variables = usePagination
    ? renameKeys(params, { pageSize: params.before ? "last" : "first" })
    : params;

  const { data, loading: queryLoading } = useQuery(query, { variables });
  const loading = bulkLoading || queryLoading;
  const paginationInfo = paginate(
    maybe(() => data?.[queryField]?.pageInfo),
    params,
    setParams
  );

  const totalFilters = useMemo(
    () =>
      Object.keys(params).filter(
        (item) => filterVariables.includes(item) && params[item] !== undefined
      ).length,
    [params, filterVariables]
  );

  const handleTabChange = (_, value) => {
    if (value === "all") {
      const resetFilters = filterVariables.reduce((o, key) => ({ ...o, [key]: undefined }), {});
      setParams({
        ...params,
        ...resetFilters,
      });
    } else {
      const filterTabData = storageFilter.find((item) => item.name === value).data;
      const newFilter = filterVariables.reduce(
        (o, key) => ({ ...o, [key]: filterTabData[key] }),
        {}
      );
      setParams({
        ...params,
        ...newFilter,
      });
    }
    if (value !== "custom") {
      setTabValue(value);
    }
  };

  useEffect(() => {
    if (totalFilters === 0) {
      setTabValue("all");
    } else {
      if (tabValue === "all") {
        setTabValue("custom");
      }
    }
  }, [tabValue, totalFilters]);

  useEffect(() => {
    toggleLoading(loading);
  }, [toggleLoading, loading]);

  const baseProps = {
    ...props,
    data: maybe(() => data?.[queryField]?.edges, []),
    pluralAppName,
    filterVariables,
    variables,
    params,
    setParams,
    loading,
    paginationInfo,
    storageFilter,
    setStorageFilter,
    tabValue,
    setTabValue,
    handleTabChange,
  };

  return (
    <>
      <Header
        title={pluralAppName}
        actions={[isCreatable && <CreateButton appName={appName} key="create" />, ...actions]}
      />
      <Card className={classes.root}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.tabs}
          value={tabValue}
          onChange={handleTabChange}
        >
          <Tab label={`All ${appName}`} value="all" />
          {storageFilter.map((item) => (
            <Tab label={item.name} value={item.name} key={item.name} />
          ))}
          {tabValue === "custom" && <Tab label="Custom Filter" value="custom" />}
        </Tabs>
        {filters.length > 0 && useSearch ? (
          <div className={classes.filter}>
            {filters.length > 0 && (
              <div>
                <FilterButton {...baseProps} />
              </div>
            )}
            {useSearch && (
              <div className={clsx(classes.filterStyle, classes.filterSearch)}>
                <FilterSearch {...baseProps} />
              </div>
            )}
            {totalFilters > 0 && (
              <div className={clsx(classes.filterStyle)}>
                <FilterSave {...baseProps} />
              </div>
            )}
          </div>
        ) : null}
        <Table {...baseProps} />
        <Pagination {...baseProps} />
      </Card>
    </>
  );
};
