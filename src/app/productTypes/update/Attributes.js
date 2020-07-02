import React from "react";

import { maybe } from "@/utils";
import { useQS } from "@/utils/hooks";

import { Card } from "@/components/Template";

import { ACTION as ASSIGN_ACTION, AttributesAssign } from "./AttributesAssign";
import { AttributesTable } from "./AttributesTable";
import { Button } from "@material-ui/core";

export const Attributes = (props) => {
  const { productType, type } = props;
  const [params, setParams] = useQS({
    action: undefined,
    ids: undefined,
    type: undefined,
  });
  const title = `${type === "VARIANT" ? "Variant" : "Product"} Attributes`;
  const attributes = maybe(
    () => productType?.[type === "VARIANT" ? "variantAttributes" : "productAttributes"],
    []
  );

  const handleClose = () => {
    setParams({
      action: undefined,
      ids: undefined,
      type: undefined,
    });
  };

  const baseProps = {
    productType,
    type,
    params,
    setParams,
    attributes,
    handleClose,
  };

  return (
    <Card
      title={title}
      action={
        <Button color="primary" onClick={() => setParams({ action: ASSIGN_ACTION, type })}>
          ASSIGN ATTRIBUTE
        </Button>
      }
      useDense
    >
      <AttributesAssign {...baseProps} />
      <AttributesTable {...baseProps} />
    </Card>
  );
};
