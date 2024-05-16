// Packages
import _ from 'lodash';
import { useSelector } from 'react-redux';
import React, { useCallback, useMemo, useState } from 'react';

// Components
import Menu from '../Menu';
import UserDropdown from '../UserDropdown';
import MenuIcon from '@mui/icons-material/Menu';
import SearchMenu from './components/SearchMenu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsMenuIcon from './components/NotificationsMenu';
import { AppBar, Badge, Box, Hidden, IconButton, Switch, Toolbar, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { getIsDrawerOpen, getThemeType, uiActions } from 'redux/services/ui/slice';
import { useAppDispatch } from 'app/store';

// Component

const CustomAppBar = () => {
  // Redux
  const dispatch = useAppDispatch();

  const theme = useSelector(getThemeType);
  const isDrawerOpen = useSelector(getIsDrawerOpen);

  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);

  const open = isDrawerOpen;

  // Callbacks
  const toggleDrawer = useCallback(
    () => dispatch(uiActions.updateLayout({ isDrawerOpen: !isDrawerOpen })),
    [dispatch, isDrawerOpen]
  );

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

  const handleThemeSwitch = useCallback(
    (event, checked) => dispatch(uiActions.update({ theme: checked ? 'dark' : 'light' })),
    [dispatch]
  );

  // Renderers Vars
  const themeValue = useMemo(() => (_.isEqual(theme, 'dark') ? true : false), [theme]);

  // Renderers
  const renderDrawerMenuBtn = useMemo(
    () => (
      <IconButton size="large" edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
        <MenuIcon color="primary" />
      </IconButton>
    ),
    [toggleDrawer]
  );

  const renderLogo = useMemo(() => <Typography sx={{ flexGrow: 1 }}>Avandra</Typography>, []);

  const renderButtons = useMemo(
    () => (
      <Box sx={{ mr: 3 }}>
        <Switch color="primary" checked={themeValue} onChange={handleThemeSwitch} />
        <IconButton
          id="search-button"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? 'search-menu' : undefined}
          onClick={handleSearchClick}>
          <Badge color="primary" variant="dot" invisible={true}>
            <SearchIcon fontSize="small" />
          </Badge>
        </IconButton>
        <IconButton
          id="notifications-button"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? 'notifications-menu' : undefined}
          onClick={handleNotiClick}>
          <Badge color="primary" variant="dot" invisible={false}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Box>
    ),
    [handleSearchClick, handleThemeSwitch, handleNotiClick, themeValue, open]
  );

  const renderDropDown = useMemo(
    () => (
      <Hidden mdDown>
        <UserDropdown />
      </Hidden>
    ),
    []
  );

  return (
    <AppBar position="fixed" elevation={0} className={classes.appbar} color="inherit">
      <Toolbar>
        {renderDrawerMenuBtn}
        {renderLogo}
        {renderButtons}
        {renderDropDown}
      </Toolbar>

      <Menu
        id="search-menu"
        anchorEl={searchAnchorEl}
        onClose={handleSearchClose}
        open={Boolean(searchAnchorEl)}
        customContent={<SearchMenu />}
      />

      <Menu
        id="notifications-menu"
        anchorEl={notiAnchorEl}
        onClose={handleNotiClose}
        open={Boolean(notiAnchorEl)}
        customContent={<NotificationsMenuIcon />}
      />
    </AppBar>
  );
};

export default CustomAppBar;
