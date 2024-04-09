// Packages
import _ from 'lodash';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import UserDropdown from 'shared/components/UserDropdown';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// Utilities
import useStyles from './styles';
import config from 'app/router/Config';
import { useIsSmall } from 'shared/utils';
import { getUserRole } from 'redux/user/slice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getDrawerSelectedItem, getIsDrawerOpen, uiActions } from 'redux/services/ui/slice';

// Component

const CustomDrawer = () => {
  // Redux
  const dispatch = useAppDispatch();

  const role = useAppSelector(getUserRole);
  const isDrawerOpen = useAppSelector(getIsDrawerOpen);
  const selectItem = useAppSelector(getDrawerSelectedItem);

  // Statics
  const classes = useStyles();
  const history = useHistory();
  const isSmall = useIsSmall();

  // State for collapsible items
  const [openSubDrawers, setOpenSubDrawers] = useState({});

  const _routes = config[role].drawerItems;

  // Callbacks
  const handleListItemClick = useCallback(
    (key) => dispatch(uiActions.update({ drawer: { selectedItem: key } })),
    [dispatch]
  );

  const toggleDrawer = useCallback(
    () => dispatch(uiActions.updateLayout({ isDrawerOpen: !isDrawerOpen })),
    [dispatch, isDrawerOpen]
  );

  // Toggles sub drawer open state
  const toggleSubDrawer = (key) => {
    setOpenSubDrawers((prevOpenSubDrawers) => ({
      ...prevOpenSubDrawers,
      [key]: !prevOpenSubDrawers[key]
    }));
  };

  // Modified click handler that prevents event propagation and navigation for items with children
  const handleItemClick = (item, event) => {
    if (item.children) {
      event.stopPropagation();
      toggleSubDrawer(item.key);
    } else {
      history.push(item.path);
      handleListItemClick(item.key);
    }
  };

  const handleChildItemClick = (child) => {
    handleListItemClick(child.key);
    history.push(child.path);
  };

  const open = isDrawerOpen;

  // Renderers
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={toggleDrawer}
      variant={isSmall ? 'temporary' : 'permanent'}
      className={classNames(classes.drawer, { open })}
      classes={{ paper: classNames(classes.drawer, { open }) }}>
      <List>
        <Hidden mdUp>
          <ListItem>
            <UserDropdown />
          </ListItem>
        </Hidden>
        {_routes.map((item) => (
          <React.Fragment key={item.key}>
            <ListItem disablePadding onClick={(event) => handleItemClick(item, event)}>
              <ListItemButton
                selected={_.isEqual(selectItem, item.key)}
                className={classNames(classes.listItemButton, { open })}>
                <ListItemIcon className={classNames(classes.listItemIcon, { open })}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} className={classNames(classes.listItemText, { open })} />
                {item.children ? openSubDrawers[item.key] ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse in={openSubDrawers[item.key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.key}
                      onClick={() => handleChildItemClick(child)}
                      selected={_.isEqual(selectItem, child.key)}
                      className={classNames(classes.listItemButton, 'child', { open })}>
                      <ListItemIcon className={classNames(classes.listItemIcon, { open })}>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.title} className={classNames(classes.listItemText, { open })} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
