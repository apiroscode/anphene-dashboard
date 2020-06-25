import React from "react";

import { Divider, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

import { Category, Collections, ProductType, Supplier } from "./components";

export const FormOrganizeProduct = (props) => {
  const { product } = props;
  return (
    <Card title="Organize Product" useMargin>
      {product ? (
        <TextField disabled value={product.productType.name} label="Product Type" fullWidth />
      ) : (
        <ProductType {...props} />
      )}
      <Divider />
      <Category {...props} />
      <Divider />
      <Supplier {...props} />
      <Divider />
      <Collections {...props} />
    </Card>
  );
};
