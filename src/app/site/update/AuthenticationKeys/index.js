import React from "react";

import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation, useQS } from "@/utils/hooks";

import { ResponsiveTable } from "@/components/_table";

import { Card } from "@/components/Card";

import { DeleteAuthorizationKey } from "../../mutations";

import { ACTION, AddKey } from "./AddKey";

export const AuthenticationKeys = (props) => {
  const { authorizationKeys } = props;
  const [deleteKey, { loading }] = useMutation(DeleteAuthorizationKey);
  const [params, setParams] = useQS({
    action: undefined,
  });

  const deleteKeyAction = async (keyType) => {
    await deleteKey({ variables: { keyType } });
  };

  return (
    <Card
      title="Authentication Keys"
      useDense
      action={
        <Button color="primary" onClick={() => setParams({ action: ACTION })}>
          ADD KEY
        </Button>
      }
    >
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>Authentication Type</TableCell>
            <TableCell>Key</TableCell>
            <TableCell padding="checkbox" align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {authorizationKeys.length > 0 ? (
            authorizationKeys.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name === "FACEBOOK" ? "Facebook" : "Google Oauth2"}</TableCell>
                <TableCell>{item.key}</TableCell>
                <TableCell padding="checkbox" align="center">
                  <IconButton
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      deleteKeyAction(item.name);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="subtitle1" color="textSecondary">
                  No keys
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ResponsiveTable>
      <AddKey params={params} setParams={setParams} />
    </Card>
  );
};
