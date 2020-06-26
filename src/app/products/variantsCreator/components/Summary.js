import React from "react";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { Card } from "@/components/Template";
import { ColGrid } from "@/app/products/components/components";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      "&>:not(:last-child)": {
        borderBottom: `1px ${theme.palette.divider} solid`,
      },
    },
    row: {
      padding: theme.spacing(2, 2),
      display: "grid",
      gridRowGap: theme.spacing(2),
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 64px",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    button: {
      textAlign: "center",
    },
  }),
  { name: "VariantCreatorSummary" }
);

export const Summary = (props) => {
  const { variants, setVariants } = props;
  const classes = useStyles();

  const handleChange = (name, value, idx) => {
    const newVariants = [...variants];
    newVariants[idx][name] = value;
    setVariants(newVariants);
  };

  const handleDelete = (idx) => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  return (
    <Card title="Created Variants" useDense>
      <div className={classes.root}>
        {variants.map((variant, idx) => {
          const variantName = variant.attributes.map((attribute) => attribute.name).join("/");
          return (
            <div className={classes.row} key={idx}>
              <ColGrid>
                <TextField label="Variant" disabled value={variantName} />
                <TextField
                  name="sku"
                  type="text"
                  label="SKU"
                  fullWidth
                  value={variant.sku}
                  onChange={(e) => handleChange(e.target.name, e.target.value, idx)}
                />
                <TextField
                  name="price"
                  type="number"
                  label="Price"
                  fullWidth
                  helperText="The base selling price of your product"
                  value={variant.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  }}
                />
                <TextField
                  name="cost"
                  type="number"
                  label="Cost"
                  fullWidth
                  helperText="The costs you incur for this product"
                  value={variant.cost}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  }}
                />
                <TextField
                  name="weight"
                  type="number"
                  label="Weight"
                  fullWidth
                  value={variant.weight}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">gr</InputAdornment>,
                  }}
                />
                <TextField
                  name="quantity"
                  type="text"
                  label="Quantity"
                  fullWidth
                  value={variant.quantity}
                  onChange={handleChange}
                />
              </ColGrid>
              <div className={classes.button}>
                <IconButton aria-label="delete" onClick={() => handleDelete(idx)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
