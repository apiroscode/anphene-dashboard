import React from "react";

import { maybe } from "@/utils";

import { Card } from "@/components/Template";

import { AttributesAssign } from "./AttributesAssign";
import { AttributesTable } from "./AttributesTable";

export const Attributes = (props) => {
  const { productType, type } = props;

  const title = `${type === "VARIANT" ? "Variant" : "Product"} Attributes`;
  const items = maybe(
    () => productType?.[type === "VARIANT" ? "variantAttributes" : "productAttributes"],
    []
  );

  return (
    <Card title={title} action={<AttributesAssign {...props} />} useDense>
      <AttributesTable {...props} items={items} />
    </Card>
  );
};
