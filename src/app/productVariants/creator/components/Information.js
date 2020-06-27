import React from "react";

import { InputAdornment, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";
import { ColGrid } from "@/app/products/components/components";

export const Information = (props) => {
  const { variants, setVariants, info, setInfo } = props;
  const mutateVariants = (name, value) => {
    const newVariants = variants.map((item) => ({
      ...item,
      [name]: value,
    }));

    setVariants(newVariants);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo({ [name]: value });
    mutateVariants(name, value);
  };

  return (
    <>
      <Card title="Product Base Information">
        <ColGrid>
          <TextField
            name="price"
            type="number"
            label="Price"
            fullWidth
            helperText="The base selling price of your product"
            value={info.price}
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
            value={info.cost}
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
            value={info.weight}
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
            value={info.quantity}
            onChange={handleChange}
          />
        </ColGrid>
      </Card>
    </>
  );
};
