import React from "react";
import { GET_VARIANT } from "@/graphql/queries/productVariants";
import { useParams } from "react-router-dom";
import { QueryWrapper } from "@/components/Template";

const Base = ({ variant }) => {};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper
      query={GET_VARIANT}
      id={id}
      fieldName="productVariant"
      queryOptions={{
        fetchPolicy: "network-only",
      }}
    >
      {(data) => <Base variant={data?.productVariant} />}
    </QueryWrapper>
  );
};
