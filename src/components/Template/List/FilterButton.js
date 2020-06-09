import React, { cloneElement, useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";

import { Checkbox } from "@/components/Checkbox";

const useStyles = makeStyles(
  (theme) => ({
    rootButton: {
      backgroundColor: lighten(theme.palette.primary.main, 0.92),
    },
    divider: {
      backgroundColor: lighten(theme.palette.primary.main, 0.48),
      margin: theme.spacing(0, 1),
    },
    listWrapper: {
      minWidth: 320,
      padding: 0,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    title: {
      fontWeight: 600,
    },
    action: {
      "& button:first-of-type": {
        marginRight: theme.spacing(1),
      },
    },
    body: {
      padding: 0,
      maxHeight: 480,
      overflow: "auto",
      "& > ul": {
        padding: 0,
        width: "100%",
      },
    },
    filterComponent: {
      backgroundColor: lighten(theme.palette.primary.main, 0.6),
    },
  }),
  { name: "TemplateListFilterButton" }
);

export const FilterButton = (props) => {
  const { params, setParams, setTabValue, filterVariables, filters } = props;
  const anchor = useRef();
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
  const [tempFilter, setTempFilter] = useState({});
  const paramsFilters = useMemo(
    () =>
      Object.keys(params)
        .filter((key) => filterVariables.includes(key) && key !== "search")
        .reduce((obj, key) => {
          obj[key] = params[key];
          return obj;
        }, {}),
    [params, filterVariables]
  );

  useEffect(() => {
    setTempFilter(paramsFilters);
  }, [paramsFilters]);

  const totalFilters = useMemo(
    () =>
      Object.keys(params).filter(
        (item) => filterVariables.includes(item) && item !== "search" && params[item] !== undefined
      ).length,
    [params, filterVariables]
  );

  const handleClose = () => setOpenFilter(false);

  const handleChecked = (e, filter) => {
    if (e.target.checked) {
      setTempFilter({
        ...tempFilter,
        [filter.field]: paramsFilters[filter.field] || filter.defaultValue,
      });
    } else {
      setTempFilter({
        ...tempFilter,
        [filter.field]: undefined,
      });
    }
  };
  const onClear = () => {
    setTempFilter({ ...paramsFilters });
  };

  const onFilters = () => {
    setParams({
      ...params,
      ...tempFilter,
    });
    setTabValue("custom");
    handleClose();
  };

  const baseProps = {
    tempFilter,
    setTempFilter,
    className: classes.filterComponent,
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        className={clsx({ [classes.rootButton]: totalFilters > 0 })}
        ref={anchor}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <span>FILTERS</span>
        {totalFilters > 0 && (
          <>
            <Divider orientation="vertical" flexItem className={classes.divider} />
            <span>{totalFilters}</span>
          </>
        )}
      </Button>
      <Popover
        open={openFilter}
        onClose={handleClose}
        anchorEl={anchor.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List className={classes.listWrapper}>
          <ListItem>
            <div className={classes.header}>
              <Typography variant="body1" className={classes.title}>
                Filters
              </Typography>
              <div className={classes.action}>
                <Button onClick={onClear}>CLEAR</Button>
                <Button variant="contained" color="primary" onClick={onFilters}>
                  DONE
                </Button>
              </div>
            </div>
          </ListItem>
          <Divider />
          <ListItem className={classes.body}>
            <List>
              {filters.map((filter, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          checked={tempFilter[filter.field] !== undefined}
                          onClick={(e) => handleChecked(e, filter)}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{filter.label}</Typography>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    {tempFilter[filter.field] !== undefined && (
                      <>
                        <ListItem className={classes.filterComponent}>
                          {cloneElement(filter.component, {
                            ...baseProps,
                            filter,
                          })}
                        </ListItem>
                        {idx + 1 !== filters.length && <Divider />}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </List>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};
