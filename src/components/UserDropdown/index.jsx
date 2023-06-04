// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useState, useMemo } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, ButtonBase, Hidden, Typography } from "@mui/material";
import Menu from "../Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles } from "lib/styles";
import useStyles from "./styles.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const UserDropdown = () => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //------------------- CALLBACKS ----------------------//
  const handleDropdownClose = useCallback(() => {
    setDropdownAnchorEl(null);
  }, []);

  const handleDropdownClick = useCallback((event) => {
    setDropdownAnchorEl(event.currentTarget);
  }, []);

  const handleProfileClick = useCallback((event) => {
    // TODO: handle profile button
  }, []);

  const handleMyAccountClick = useCallback((event) => {
    // TODO: handle my account button
  }, []);

  const handleLogoutClick = useCallback((event) => {
    // TODO: handle logout button
  }, []);

// ---------------------- /Callbacks ----------------------- //
// --------------------------------------------------------- //

// --------------------------------------------------------- //
// --------------------- Renderers Vars -------------------- //
  const getMenuItems = useMemo(
    () => [
      {
        key: "profile",
        label: "Profile",
        onClick: handleProfileClick,
      },
      {
        key: "my-account",
        label: "My account",
        onClick: handleMyAccountClick,
      },
      {
        key: "logout",
        label: "Logout",
        onClick: handleLogoutClick,
      },
    ],
    [handleLogoutClick, handleMyAccountClick, handleProfileClick]
  );
// -------------------- /Renderers Vars -------------------- //
// --------------------------------------------------------- //

  const open = Boolean(dropdownAnchorEl);

  const renderDropDown = useMemo(
    () => (
      // <Hidden smDown>
        <ButtonBase
          id="dropdown-button"
          aria-controls={open ? "dropdown-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleDropdownClick}
        >
          <Box className={classes.dropdownContainer}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>J</Avatar>
            <Box className={classes.nameAndRole}>
              <Typography sx={{ mr: 3, lineHeight: 1.1 }} variant="subtitle2">
                John Doe
              </Typography>
              <Typography
                sx={{ lineHeight: 1.1 }}
                variant="caption"
                className={classes.role}
              >
                Admin
              </Typography>
            </Box>
            <ExpandMoreIcon fontSize="small" className={classes.icon} />
          </Box>
        </ButtonBase>
      // </Hidden>
    ),
    [
      open,
      classes.role,
      classes.icon,
      classes.nameAndRole,
      handleDropdownClick,
      classes.dropdownContainer,
    ]
  );

  const renderMenu = useMemo(
    () => (
      <Menu
        id="dropdown-menu"
        items={getMenuItems}
        anchorEl={dropdownAnchorEl}
        onClose={handleDropdownClose}
        MenuListProps={{
          "aria-labelledby": "dropdown-button",
          sx: { width: dropdownAnchorEl && dropdownAnchorEl.offsetWidth },
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
