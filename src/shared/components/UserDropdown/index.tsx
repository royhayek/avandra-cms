// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '../Menu';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles } from 'shared/assets/styles';
import { getUser } from 'redux/user/slice';
import { useAppSelector } from 'app/store';
import { logout } from 'shared/utils';
import useStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const UserDropdown = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const user = useAppSelector(getUser);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const history = useHistory();

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<HTMLElement | null>(null);
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  //----------------------------------------------------//
  //------------------- CALLBACKS ----------------------//
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

  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
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
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderDropDown = useMemo(
    () => (
      // <Hidden smDown>
      <ButtonBase
        id="dropdown-button"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleDropdownClick}>
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
      // </Hidden>
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
