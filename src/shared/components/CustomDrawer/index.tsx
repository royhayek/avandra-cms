// Packages
import _ from 'lodash';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import UserDropdown from 'shared/components/UserDropdown';
import { Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// Utilities
import useStyles from './styles';
import config from 'app/router/Config';
import { useIsSmall } from 'shared/utils';
import { useAppSelector } from 'app/store';
import { getUserRole } from 'redux/user/slice';
import { getDrawerSelectedItem, uiActions } from 'redux/services/ui/slice';

// Component
interface CustomDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomDrawer = ({ open, setOpen }: CustomDrawerProps) => {
  // Redux
  const dispatch = useDispatch();
  const updateLayout = useCallback((payload) => dispatch(uiActions.update(payload)), [dispatch]);

  const role = useAppSelector(getUserRole);
  const selectItem = useAppSelector(getDrawerSelectedItem);

  // Statics
  const classes = useStyles();
  const history = useHistory();
  const isSmall = useIsSmall();

  const _routes = config[role].drawerItems;

  // Callbacks
  const handleListItemClick = useCallback((key) => updateLayout({ drawer: { selectedItem: key } }), [updateLayout]);

  // Renderers
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={() => setOpen(false)}
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
