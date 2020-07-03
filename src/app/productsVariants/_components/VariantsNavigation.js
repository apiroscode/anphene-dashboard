import React from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { Button, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";

import { ResponsiveTable, TableCellAvatar } from "@/components/_table";
import { Card } from "@/components/Card";

const useStyles = makeStyles(
  (theme) => ({
    colName: {
      paddingLeft: 0,
      textAlign: [["left"], "!important"],
    },
    link: {
      cursor: "pointer",
    },
    tabActive: {
      "&:before": {
        background: theme.palette.primary.main,
        content: '""',
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: 2,
      },
      position: "relative",
    },
  }),
  { name: "VariantsNavigation" }
);

export const VariantsNavigation = (props) => {
  const { variants, variantId, fallbackThumbnail } = props;
  const navigate = useNavigate();
  const classes = useStyles();

  const onAdd = () => {
    navigate("../create");
  };

  const onRowClick = (id) => {
    navigate(`../${id}`);
  };

  return (
    <Card title="Variants" useDense>
      <ResponsiveTable>
        <TableBody>
          {variants.map((variant) => (
            <TableRow
              hover={!!variant}
              key={variant ? variant.id : "skeleton"}
              className={classes.link}
              onClick={variant ? () => onRowClick(variant.id) : undefined}
            >
              <TableCellAvatar
                className={clsx({
                  [classes.tabActive]: variant && variant.id === variantId,
                })}
                thumbnail={maybe(() => variant.images[0].url, fallbackThumbnail)}
              />
              <TableCell className={classes.colName}>{variant.name || variant.sku}</TableCell>
            </TableRow>
          ))}

          {variantId ? (
            <TableRow>
              <TableCell colSpan={2}>
                <Button color="primary" onClick={onAdd}>
                  Add Variant
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCellAvatar className={classes.tabActive} thumbnail={null} />
              <TableCell className={classes.colName}>New Variant</TableCell>
            </TableRow>
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
