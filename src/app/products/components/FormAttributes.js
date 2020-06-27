import React from "react";

import { Divider, Typography } from "@material-ui/core";

import { ErrorMessage } from "@/components/form";
import { Card } from "@/components/Template";

import { AttributeDropDown, AttributeMultiSelect, ColGrid } from "./components";

export const FormAttributes = (props) => {
  const { productTypes, watch, product, errors } = props;
  const attributes = watch("attributes");

  let productAttributes;
  if (product) {
    productAttributes = product.attributes.map((item) => item.attribute);
  } else {
    const productTypeID = watch("productType");
    const productTypeNode = productTypes.find((item) => item.node.id === productTypeID);
    const productType = productTypeNode ? productTypeNode.node : undefined;
    productAttributes = productType?.productAttributes;
  }

  return productAttributes ? (
    <Card title="FormAttributes" useMargin>
      <ErrorMessage errors={errors} name="attributes" useMarginTop={false} />
      {productAttributes.map((item, idx) => (
        <React.Fragment key={item.id}>
          <ColGrid>
            <Typography variant="body1">
              {item.name}
              {item.valueRequired ? "*" : ""}
            </Typography>
            {item.inputType === "DROPDOWN" ? (
              <AttributeDropDown
                {...props}
                idx={idx}
                attributes={attributes}
                values={item.values}
              />
            ) : (
              <AttributeMultiSelect
                {...props}
                idx={idx}
                attributes={attributes}
                values={item.values}
              />
            )}
          </ColGrid>
          {productAttributes.length !== idx + 1 && <Divider />}
        </React.Fragment>
      ))}
    </Card>
  ) : null;
};
