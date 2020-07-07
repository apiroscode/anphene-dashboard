import React from "react";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(
  (theme) => ({
    iconButton: {
      background: theme.palette.background.paper,
      borderRadius: "100%",
      height: 32,
      padding: 0,
      width: 32,
    },
  }),
  { name: "CardMenu" }
);

export const AddressCardAction = (props) => {
  const { className, disabled, menuItems } = props;
  const classes = useStyles(props);

  const [anchorEl, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleMenuClick = (menuItemIndex) => {
    menuItems[menuItemIndex].onSelect();
    handleClose();
  };

  const open = !!anchorEl;

  return (
    <div className={className}>
      <IconButton
        aria-label="More"
        aria-owns={open ? "long-menu" : null}
        aria-haspopup="true"
        className={classes.iconButton}
        color="primary"
        disabled={disabled}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        {menuItems.map((menuItem, menuItemIndex) => (
          <MenuItem onClick={() => handleMenuClick(menuItemIndex)} key={menuItem.label}>
            {menuItem.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
