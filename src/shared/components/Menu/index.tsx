// Packages
import React, { ReactNode } from 'react';

// Components
import { Menu as MUIMenu, MenuItem, Typography, MenuProps as MUIMenuProps } from '@mui/material';

// Interfaces
interface MenuItemData {
  key: string;
  onClick: () => void;
  label: string;
}

interface MenuProps extends MUIMenuProps {
  id: string;
  onClose: () => void;
  items?: MenuItemData[];
  customContent?: ReactNode;
  anchorEl: null | HTMLElement;
}

// Component

const Menu = ({ id, items, customContent, anchorEl, onClose, ...props }: MenuProps) => (
  <MUIMenu id={id} anchorEl={anchorEl} onClose={onClose} {...props}>
    {customContent
      ? customContent
      : items?.map(({ key, onClick, label }) => (
          <MenuItem key={key} onClick={onClick}>
            <Typography variant="body2">{label}</Typography>
          </MenuItem>
        ))}
  </MUIMenu>
);

export default Menu;
