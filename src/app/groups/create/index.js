import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GET_ALL_PERMISSIONS } from "@/graphql/queries/groups";
import { QueryWrapper, Header } from "@/components/Template";
import { ColGrid, Card } from "@/components/Template";
import * as yup from "yup";
import { validationResolver } from "@/components/form";
import { useForm } from "react-hook-form";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  storefrontSearchPosition: yup.number(),
});

const useStyles = makeStyles((theme) => ({}), { name: "GroupCreate" });

export default (props) => {
  return (
    <QueryWrapper query={GET_ALL_PERMISSIONS} fieldName="allPermissions">
      {(data) => {
        return (
          <>
            <Header title="Create Group" />
            <ColGrid>
              <Card title="General Information" densePadding>
                a
              </Card>
              <Card title="Permissions">Permissions</Card>
            </ColGrid>
          </>
        );
      }}
    </QueryWrapper>
  );
};
