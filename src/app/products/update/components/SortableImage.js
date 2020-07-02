import React from "react";

import { SortableElement } from "react-sortable-hoc";

import { ImageTile } from "@/components/ImageTile";

export const SortableImage = SortableElement(({ image, onImageEdit, onImageDelete }) => (
  <ImageTile image={image} onImageEdit={onImageEdit} onImageDelete={onImageDelete} />
));
