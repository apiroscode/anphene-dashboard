import React, { cloneElement } from "react";

import { useParams } from "react-router-dom";

import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";

import { _plugins } from "../_plugins";

import { GetPlugin } from "../queries";

const Base = ({ plugin }) => {
  console.log(plugin);
  return (
    <>
      <Header title={`${plugin.name} Details`} />
      {cloneElement(_plugins[plugin.id].component, {
        plugin,
      })}
    </>
  );
};

export default () => {
  const { id } = useParams();
  return (
    <QueryWrapper
      query={GetPlugin}
      id={id}
      fieldName="plugin"
      queryOptions={{
        fetchPolicy: "network-only",
      }}
    >
      {(data) => <Base plugin={data.plugin} />}
    </QueryWrapper>
  );
};
