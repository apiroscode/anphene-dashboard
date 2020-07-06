import React from "react";
import { QueryWrapper } from "@/components/QueryWrapper";
import { GetCustomer } from "@/app/customers/queries";
import { useParams } from "react-router-dom";

export const Base = ({ customer }) => {
  console.log(customer);
  return <div>.</div>;
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper query={GetCustomer} id={id} fieldName="user">
      {(data) => <Base customer={data.user} />}
    </QueryWrapper>
  );
};
