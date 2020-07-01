import React, { useState } from "react";

import { useStoreState } from "easy-peasy";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { Box, Container, Portal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation } from "@/utils/hooks";

import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

const useStyles = makeStyles(
  (theme) => ({
    wrapper: {
      background: theme.palette.background.default,
      borderTop: "1px solid transparent",
      boxShadow: `0 -2px 2px 0 ${theme.palette.divider}`,
      transition: `box-shadow ${theme.transitions.duration.shortest}ms`,
    },
    root: {
      minHeight: 68,
      display: "flex",
      alignItems: "center",
    },
    actionButton: {
      "&>:not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
  }),
  { name: "SaveButton" }
);

const Delete = ({ deleteProps, handleBack }) => {
  const { mutation, name, id, field } = deleteProps;
  const [open, setOpen] = useState(false);
  const [deleteMutation, { loading }] = useMutation(mutation);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMutation = async () => {
    const result = await deleteMutation({ variables: { id } });
    if (result === undefined) return;

    const { data } = result;
    const errors = data[field].errors;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`${name} successfully deleted.`, {
        variant: "success",
      });
      setOpen(false);
      handleBack();
    }
  };

  return (
    <>
      <Button buttonStyle="error" variant="contained" onClick={handleOpen} loading={loading}>
        DELETE
      </Button>
      <Dialog
        open={open}
        handleOk={handleMutation}
        handleClose={handleClose}
        title={`Delete ${name}`}
        content={
          <>
            Are you sure you want to delete <strong>{name}</strong> ?
          </>
        }
        okText="DELETE"
        okStyle="error"
      />
    </>
  );
};

export const SaveButton = (props) => {
  const { onSubmit, disabled, loading, deleteProps, saveText = "SAVE" } = props;
  const backUrl = deleteProps ? (deleteProps.backUrl ? deleteProps.backUrl : "..") : "..";
  const navigate = useNavigate();
  const saveButtonRef = useStoreState((state) => state.app.saveButtonRef);
  const classes = useStyles();

  const handleBack = () => {
    navigate(backUrl);
  };

  return saveButtonRef ? (
    <Portal container={saveButtonRef.current}>
      <div className={classes.wrapper}>
        <Container maxWidth="lg" className={classes.root}>
          {deleteProps && <Delete deleteProps={deleteProps} handleBack={handleBack} />}
          <Box marginLeft="auto" className={classes.actionButton}>
            <Button onClick={handleBack} loading={loading}>
              BACK
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={onSubmit}
              disabled={disabled}
              loading={loading}
            >
              {saveText}
            </Button>
          </Box>
        </Container>
      </div>
    </Portal>
  ) : null;
};
