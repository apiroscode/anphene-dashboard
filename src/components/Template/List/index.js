import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useStoreActions } from "easy-peasy";
import pluralize from "pluralize";

import { Card, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useLocalStorage, useQS, useQuery } from "@/utils/hooks";

import { optimizeParams } from "../utils";
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
      "& > *:not(:first-child)": {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
          marginTop: theme.spacing(2),
          marginLeft: 0,
        },
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

const DEFAULT_PAGE_SIZE = 25;
export const List = (props) => {
  const {
    appName,
    query,
    queryField,
    vars = {},
    filters = [],
    table,
    isCreatable = true,
    useSearch = true,
    usePagination = true,
    actions = [],
    bulkMutations = [],
    bulkLoading = false,
    storageKey = queryField,
  } = props;

  const classes = useStyles();
  const pluralAppName = pluralize(appName);

  const toggleLoading = useStoreActions((actions) => actions.app.toggleLoading);
  const [storageFilter, setStorageFilter] = useLocalStorage(`${storageKey}`, []);
  const [tabValue, setTabValue] = useState("all");

  const filterParams = {
    search: undefined,
    ...filters.reduce((obj, item) => {
      const { field, type } = item;
      return {
        ...obj,
        ...(type === "range"
          ? {
              [`${field}From`]: undefined,
              [`${field}To`]: undefined,
            }
          : { [field]: undefined }),
      };
    }, {}),
  };
  const rangeKeys = filters.filter((item) => item.type === "range").map((item) => item.field);

  const [params, setParams] = useQS({
    before: undefined,
    after: undefined,
    pageSize: DEFAULT_PAGE_SIZE,
    sortDirection: table?.defaultSort?.direction,
    sortField: table?.defaultSort?.field,
    ...filterParams,
  });

  const variables = useMemo(
    () => optimizeParams(params, { pageSize: params.before ? "last" : "first" }, rangeKeys),
    [params, rangeKeys]
  );

  const { data, loading: queryLoading } = useQuery(query, {
    variables: { ...variables, ...vars },
  });
  const loading = bulkLoading || queryLoading;

  const totalFilters = useCallback(
    (withSearch = true) => {
      let total = Object.keys(params).filter((item) => {
        if (!withSearch) {
          return (
            Object.keys(filterParams).includes(item) &&
            params[item] !== undefined &&
            item !== "search"
          );
        } else {
          return Object.keys(filterParams).includes(item) && params[item] !== undefined;
        }
      }).length;

      if (rangeKeys.length > 0) {
        for (let key of rangeKeys) {
          if (params[`${key}From`] !== undefined && params[`${key}To`] !== undefined) {
            total = total - 1;
          }
        }
      }

      return total;
    },
    [params, filterParams, rangeKeys]
  );

  const handleTabChange = (_, value) => {
    if (value === "all") {
      const resetFilters = Object.keys(filterParams).reduce(
        (o, key) => ({ ...o, [key]: undefined }),
        {}
      );
      setParams(resetFilters);
      setTabValue(value);
    } else if (value !== "custom") {
      const filterTabData = storageFilter.find((item) => item.name === value).data;
      const newFilter = Object.keys(filterParams).reduce(
        (o, key) => ({ ...o, [key]: filterTabData[key] }),
        {}
      );
      setParams(newFilter);
      setTabValue(value);
    }
  };

  useEffect(() => {
    if (totalFilters() === 0) {
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
    params,
    setParams,
    setTabValue,
    filterParams,
    filters,
    totalFilters,
    tabValue,
    handleTabChange,
    storageFilter,
    setStorageFilter,
    appName,
    loading,
    data,
    queryField,
    table,
    bulkMutations,
    pluralAppName,
    query,
    variables,
    vars,
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
        {filters.length > 0 || useSearch ? (
          <div className={classes.filter}>
            {filters.length > 0 && (
              <div>
                <FilterButton {...baseProps} />
              </div>
            )}
            {useSearch && (
              <div className={classes.filterSearch}>
                <FilterSearch {...baseProps} />
              </div>
            )}
            {totalFilters() > 0 && (
              <div>
                <FilterSave {...baseProps} />
              </div>
            )}
          </div>
        ) : null}
        <Table {...baseProps} />
        {usePagination && <Pagination {...baseProps} />}
      </Card>
    </>
  );
};
