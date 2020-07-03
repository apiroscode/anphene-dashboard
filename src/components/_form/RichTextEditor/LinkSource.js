import React from "react";

import { EditorState, RichUtils } from "draft-js";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export const LinkSource = ({ editorState, entity, entityType, onComplete, onClose }) => {
  const methods = useForm({
    defaultValues: {
      url: entity ? entity.getData().url : "",
    },
  });
  const { control, errors, handleSubmit } = methods;

  const onSubmit = ({ url }) => {
    if (url) {
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity(entityType.type, "MUTABLE", { url });
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentWithEntity,
      });
      const nextState = RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      );

      onComplete(nextState);
    } else {
      onComplete(editorState);
    }
  };

  return (
    <Dialog onClose={onClose} open={true} fullWidth maxWidth="sm">
      <DialogTitle>Add or Edit Link</DialogTitle>
      <DialogContent>
        <Controller
          as={TextField}
          control={control}
          name="url"
          type="text"
          label="URL Linked"
          fullWidth
          error={!!errors.url}
          helperText={errors.url?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
