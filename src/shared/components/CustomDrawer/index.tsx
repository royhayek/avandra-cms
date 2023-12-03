// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useCallback } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import UserDropdown from 'shared/components/UserDropdown';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getDrawerSelectedItem, uiActions } from 'redux/services/ui/slice';
import { useIsSmall } from 'shared/utils';
import config from 'app/router/Config';
import useStyles from './styles.ts';
import { useAppSelector } from 'app/store.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface CustomDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomDrawer = ({ open, setOpen }: CustomDrawerProps) => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const classes = useStyles();
  const history = useHistory();
  const isSmall = useIsSmall();

  // TODO: replace "admin" with the dynamic role
  const _routes = config['admin'].drawerItems;
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch();
  const updateLayout = useCallback((payload) => dispatch(uiActions.update(payload)), [dispatch]);

  const selectItem = useAppSelector(getDrawerSelectedItem);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const handleListItemClick = useCallback((key) => updateLayout({ drawer: { selectedItem: key } }), [updateLayout]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
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
          <ListItem key={item.key} disablePadding sx={{ display: 'block' }} onClick={() => history.push(item.path)}>
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
