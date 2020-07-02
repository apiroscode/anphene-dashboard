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

import { useObjectState } from "@/utils/hooks";
import { Checkbox } from "../../Checkbox";

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
        maxHeight: 480,
      },
    },
    filterComponent: {
      backgroundColor: lighten(theme.palette.primary.main, 0.6),
    },
  }),
  { name: "FilterButton" }
);

export const FilterButton = (props) => {
  const { params, setParams, setTabValue, filterParams, filters, totalFilters } = props;
  const anchor = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tempFilter, setTempFilter] = useObjectState();
  const paramsFilters = useMemo(
    () =>
      Object.keys(params)
        .filter((key) => Object.keys(filterParams).includes(key) && key !== "search")
        .reduce((obj, key) => {
          obj[key] = params[key];
          return obj;
        }, {}),
    [params, filterParams]
  );

  useEffect(() => {
    setTempFilter(paramsFilters);
  }, [setTempFilter, paramsFilters]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChecked = (e, filter) => {
    if (filter.type === "range") {
      if (e.target.checked) {
        setTempFilter({
          [`${filter.field}From`]: paramsFilters[`${filter.field}From`] || "",
          [`${filter.field}To`]: paramsFilters[`${filter.field}To`] || "",
        });
      } else {
        setTempFilter({
          [`${filter.field}From`]: undefined,
          [`${filter.field}To`]: undefined,
        });
      }
    } else {
      if (e.target.checked) {
        setTempFilter({
          [filter.field]: paramsFilters[filter.field] || filter.defaultValue,
        });
      } else {
        setTempFilter({
          [filter.field]: undefined,
        });
      }
    }
  };
  const onClear = () => {
    setTempFilter(paramsFilters);
  };

  const onFilters = () => {
    setParams(tempFilter);
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
        className={clsx({ [classes.rootButton]: totalFilters(false) > 0 })}
        ref={anchor}
        onClick={() => setOpen(!open)}
      >
        <span>FILTERS</span>
        {totalFilters(false) > 0 && (
          <>
            <Divider orientation="vertical" flexItem className={classes.divider} />
            <span>{totalFilters(false)}</span>
          </>
        )}
      </Button>
      <Popover
        open={open}
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
                const checked =
                  filter.type === "range"
                    ? tempFilter[`${filter.field}From`] !== undefined ||
                      tempFilter[`${filter.field}To`] !== undefined
                    : tempFilter[filter.field] !== undefined;
                return (
                  <React.Fragment key={idx}>
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox checked={checked} onClick={(e) => handleChecked(e, filter)} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{filter.label}</Typography>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    {checked && (
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
