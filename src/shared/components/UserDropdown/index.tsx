// Packages
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import React, { useCallback, useState, useMemo } from 'react';

// Components
import Menu from '../Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { logout } from 'shared/utils';
import { getUser } from 'redux/user/slice';
import { useAppSelector } from 'app/store';
import { useCommonStyles } from 'shared/assets/styles';

// Component

const UserDropdown = () => {
  // Redux
  const user = useAppSelector(getUser);

  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const history = useHistory();

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<HTMLElement | null>(null);

  // Callbacks
  const handleDropdownClose = useCallback(() => {
    setDropdownAnchorEl(null);
  }, []);

  const handleDropdownClick = useCallback((event) => {
    setDropdownAnchorEl(event.currentTarget);
  }, []);

  const handleMyAccountClick = useCallback(() => {
    history.push('/user');
    setDropdownAnchorEl(null);
  }, [history]);

  const handleLogoutClick = useCallback(() => {
    logout('User logged out');
  }, []);

  // Renderers Vars
  const getMenuItems = useMemo(
    () => [
      {
        key: 'my-account',
        label: 'My account',
        onClick: handleMyAccountClick
      },
      {
        key: 'logout',
        label: 'Logout',
        onClick: handleLogoutClick
      }
    ],
    [handleLogoutClick, handleMyAccountClick]
  );

  const open = Boolean(dropdownAnchorEl);

  // Renderers
  const renderDropDown = useMemo(
    () => (
      <ButtonBase
        id="dropdown-button"
        aria-haspopup="true"
        onClick={handleDropdownClick}
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'dropdown-menu' : undefined}>
        <Box className={classes.dropdownContainer}>
          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{_.slice(user?.name, 0, 1)}</Avatar>
          <Box className={classes.nameAndRole}>
            <Typography sx={{ mr: 3, lineHeight: 1.1 }} variant="subtitle2">
              {user?.name}
            </Typography>
            <Typography sx={{ lineHeight: 1.1 }} variant="caption" className={classes.role}>
              Admin
            </Typography>
          </Box>
          <ExpandMoreIcon fontSize="small" className={classes.icon} />
        </Box>
      </ButtonBase>
    ),
    [open, handleDropdownClick, classes.dropdownContainer, classes.nameAndRole, classes.role, classes.icon, user?.name]
  );

  const renderMenu = useMemo(
    () => (
      <Menu
        id="dropdown-menu"
        items={getMenuItems}
        anchorEl={dropdownAnchorEl}
        onClose={handleDropdownClose}
        open={Boolean(dropdownAnchorEl)}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
          sx: { width: dropdownAnchorEl && dropdownAnchorEl.offsetWidth }
        }}
      />
    ),
    [dropdownAnchorEl, getMenuItems, handleDropdownClose]
  );

  return (
    <>
      {renderDropDown}
      {renderMenu}
    </>
  );
};

export default UserDropdown;
