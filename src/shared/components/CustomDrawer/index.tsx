// Packages
import _ from 'lodash';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import UserDropdown from 'shared/components/UserDropdown';
import { Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

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
          <ListItem key={item.key} onClick={() => history.push(item.path)} sx={{ display: 'block' }} disablePadding>
            <ListItemButton
              selected={_.isEqual(selectItem, item?.key)}
              onClick={() => handleListItemClick(item.key)}
              className={classNames(classes.listItemButton, { open })}>
              <ListItemIcon color="inherit" className={classNames(classes.listItemIcon, { open })}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} className={classNames(classes.listItemText, { open })} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
