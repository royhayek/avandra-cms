// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsMenu from "./components/NotificationsMenu";
import UserDropdown from "components/UserDropdown";
import SearchMenu from "./components/SearchMenu";
import Menu from "../Menu";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles } from "lib/styles";
import * as actions from "services/ui/actions";
import { getThemeType } from "services/ui/selectors";
import useStyles from "./styles.js";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const CustomAppBar = ({ open, setOpen }) => {
  // --------------------------------------------------------- //
  // ------------------------ Static ------------------------- //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  // ----------------------- /Static ------------------------- //
  // --------------------------------------------------------- //

  //----------------------------------------------------//
  //---------------------- REDUX -----------------------//
  const theme = useSelector(getThemeType);

  const dispatch = useDispatch();
  const updateUI = useCallback(
    (payload) => dispatch(actions.update(payload)),
    [dispatch]
  );
  //--------------------- /REDUX -----------------------//
  //----------------------------------------------------//

  //----------------------------------------------------//
  //------------------- CALLBACKS ----------------------//
  const handleDrawerOpen = useCallback(() => {
    setOpen((cur) => !cur);
  }, [setOpen]);

  const handleDropdownClose = useCallback(() => {
    setDropdownAnchorEl(null);
  }, []);

  const handleDropdownClick = useCallback((event) => {
    setDropdownAnchorEl(event.currentTarget);
  }, []);

  const handleNotiClose = useCallback(() => {
    setNotiAnchorEl(null);
  }, []);

  const handleNotiClick = useCallback((event) => {
    setNotiAnchorEl(event.currentTarget);
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchAnchorEl(null);
  }, []);

  const handleSearchClick = useCallback((event) => {
    setSearchAnchorEl(event.currentTarget);
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

  const handleThemeSwitch = useCallback(
    (event, checked) => updateUI({ theme: checked ? "dark" : "light" }),
    [updateUI]
  );
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
  const getMenuItems = useMemo(() => {
    return [
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
    ];
  }, [handleLogoutClick, handleMyAccountClick, handleProfileClick]);

  console.debug("theme", theme);
  const themeValue = useMemo(
    () => (_.isEqual(theme, "dark") ? true : false),
    [theme]
  );
  console.debug("themeValue", themeValue);
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderDrawerMenuBtn = useMemo(() => {
    return (
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
    );
  }, [handleDrawerOpen]);

  const renderLogo = useMemo(() => {
    return <Typography sx={{ flexGrow: 1 }}>LOGO</Typography>;
  }, []);

  const renderButtons = useMemo(() => {
    return (
      <Box sx={{ mr: 3 }}>
        <Switch
          color="primary"
          checked={themeValue}
          className={classes.switch}
          onChange={handleThemeSwitch}
        />
        <IconButton
          id="search-button"
          aria-controls={open ? "search-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleSearchClick}
        >
          <Badge color="primary" variant="dot" invisible={true}>
            <SearchIcon fontSize="small" />
          </Badge>
        </IconButton>
        <IconButton
          id="notifications-button"
          aria-controls={open ? "notifications-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleNotiClick}
        >
          <Badge color="primary" variant="dot" invisible={false}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Box>
    );
  }, [
    handleSearchClick,
    handleThemeSwitch,
    handleNotiClick,
    classes.switch,
    themeValue,
    open,
  ]);

  const renderDropDown = useMemo(
    () => (
      <Hidden mdDown>
        <UserDropdown />
      </Hidden>
    ),
    []
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={classes.appbar}
      color="inherit"
    >
      <Toolbar>
        {renderDrawerMenuBtn}
        {renderLogo}
        {renderButtons}
        {renderDropDown}
      </Toolbar>

      <Menu
        id="search-menu"
        customContent={<SearchMenu />}
        anchorEl={searchAnchorEl}
        placement={"bottom"}
        onClose={handleSearchClose}
      />

      <Menu
        id="notifications-menu"
        customContent={<NotificationsMenu />}
        anchorEl={notiAnchorEl}
        placement={"bottom"}
        onClose={handleNotiClose}
      />
    </AppBar>
  );
};

export default CustomAppBar;
