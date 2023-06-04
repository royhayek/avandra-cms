// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React from "react";
import { Menu as MUIMenu, MenuItem, Typography } from "@mui/material";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Menu = ({ id, items, customContent, anchorEl, onClose, ...props }) => {
  return (
    <MUIMenu
      id={id}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      {...props}
    >
      {customContent
        ? customContent
        : items.map((item) => (
            <MenuItem key={item.key} onClick={item.onClick}>
              <Typography variant="body2">{item.label}</Typography>
            </MenuItem>
          ))}
    </MUIMenu>
  );
};

export default Menu;
