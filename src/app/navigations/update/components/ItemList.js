import React from "react";

import clsx from "clsx";
import { useStoreState } from "easy-peasy";
import SortableTree from "react-sortable-tree";

import { Button, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";

import Draggable from "@/components/icons/Draggable";

import { getDiff, getNodeData, getNodeQuantity } from "./tree";

const NODE_HEIGHT = 56;
const NODE_MARGIN = 40;

const useStyles = makeStyles(
  (theme) => ({
    actions: {
      flexDirection: "row",
    },
    container: {
      background: theme.palette.grey[200],
    },
    darkContainer: {
      background: `${theme.palette.grey[800]} !important`,
    },
    deleteButton: {
      marginRight: theme.spacing(1),
    },
    dragIcon: {
      cursor: "grab",
    },
    nodeTitle: {
      cursor: "pointer",
      marginLeft: theme.spacing(7),
    },
    root: {
      "& .rst__collapseButton": {
        display: "none",
      },
      "& .rst__node": {
        "&:first-of-type": {
          "& $row": {
            borderTop: `1px ${theme.palette.divider} solid`,
          },
        },
      },
    },
    row: {
      alignItems: "center",
      background: theme.palette.background.paper,
      borderBottom: `1px ${theme.palette.divider} solid`,
      borderRadius: 0,
      display: "flex",
      flexDirection: "row",
      height: NODE_HEIGHT,
      justifyContent: "flex-start",
      paddingLeft: theme.spacing(3),
    },
    rowContainer: {
      "& > *": {
        opacity: 1,
        transition: `opacity ${theme.transitions.duration.standard}ms`,
      },
      transition: `margin ${theme.transitions.duration.standard}ms`,
    },
    rowContainerDragged: {
      "&$rowContainer": {
        "&:before": {
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: "100%",
          content: "''",
          height: 7,
          left: 0,
          position: "absolute",
          top: -3,
          width: 7,
        },
        borderTop: `1px solid ${theme.palette.primary.main}`,
        height: 0,
        position: "relative",
        top: -1,
      },
    },
    rowContainerPlaceholder: {
      opacity: 0,
    },
    spacer: {
      flex: 1,
    },
  }),
  { name: "MenuItems" }
);

const Placeholder = (props) => {
  const classes = useStyles(props);

  return (
    <Paper className={classes.row} elevation={0}>
      <Typography>
        Add new menu item to begin creating menuAdd new menu item to begin creating menu
      </Typography>
    </Paper>
  );
};

const Node = (props) => {
  const { canDrag, node, path, connectDragPreview, connectDragSource, isDragging } = props;
  const classes = useStyles(props);

  const draggedClassName = clsx(classes.rowContainer, classes.rowContainerDragged);
  const defaultClassName = isDragging ? draggedClassName : classes.rowContainer;
  const placeholderClassName = clsx(classes.rowContainer, classes.rowContainerPlaceholder);

  const [className, setClassName] = React.useState(defaultClassName);
  React.useEffect(() => {
    return setClassName(defaultClassName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleDragStart = () => {
    setClassName(placeholderClassName);
    setTimeout(() => setClassName(defaultClassName), 0);
  };

  return connectDragPreview(
    <div
      className={className}
      style={{
        marginLeft: NODE_MARGIN * (path.length - 1),
      }}
    >
      <Paper className={classes.row} elevation={0}>
        {canDrag ? (
          connectDragSource(
            <div onDragStart={handleDragStart}>
              <Draggable className={classes.dragIcon} />
            </div>
          )
        ) : (
          <div>
            <Draggable className={classes.dragIcon} />
          </div>
        )}
        <Typography className={classes.nodeTitle} onClick={node.onEdit}>
          {node.title}
        </Typography>
        <div className={classes.spacer} />
        <Button color="primary" onClick={node.onClick}>
          SHOW
        </Button>
        <IconButton color="primary" onClick={node.onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton
          className={classes.deleteButton}
          color="primary"
          onClick={() =>
            node.onChange({
              id: node.id,
              type: "remove",
            })
          }
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export const ItemList = (props) => {
  const { items, onChange, onItemClick, onItemEdit, loading } = props;
  const classes = useStyles(props);
  const appTheme = useStoreState((state) => state.app.theme);

  return (
    <div
      className={clsx(classes.container, {
        [classes.darkContainer]: appTheme === "dark",
      })}
      style={{
        minHeight: (items ? getNodeQuantity(items) - 1 : 1) * NODE_HEIGHT,
        padding: !items && "0 24px",
        paddingTop: !items && 20,
      }}
    >
      <SortableTree
        className={classes.root}
        generateNodeProps={({ path }) => ({
          className: classes.row,
          style: {
            marginLeft: NODE_MARGIN * (path.length - 1),
          },
        })}
        canDrag={!loading}
        isVirtualized={false}
        rowHeight={NODE_HEIGHT}
        treeData={items.map((item) => getNodeData(item, onChange, onItemClick, onItemEdit))}
        theme={{
          nodeContentRenderer: Node,
        }}
        onChange={(newTree) => {
          return onChange(
            getDiff(
              items.map((item) => getNodeData(item, onChange, onItemClick, onItemEdit)),
              newTree
            )
          );
        }}
        placeholderRenderer={Placeholder}
      />
    </div>
  );
};
