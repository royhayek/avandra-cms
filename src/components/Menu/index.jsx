// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Menu as MUIMenu, MenuItem, Typography } from "@mui/material";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Menu = ({ id, items, customContent, anchorEl, onClose, ...props }) => {
  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <MUIMenu id={id} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose} {...props}>
      {customContent
        ? customContent
        : items.map(({ key, onClick, label }) => (
            <MenuItem key={key} onClick={onClick}>
              <Typography variant="body2">{label}</Typography>
            </MenuItem>
          ))}
    </MUIMenu>
  );
};

export default Menu;
