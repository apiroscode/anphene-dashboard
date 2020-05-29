import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@material-ui/core";

export const CreateButton = ({ appName }) => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="primary" onClick={() => navigate("create")} key="create">
      Create {appName}
    </Button>
  );
};
