// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useCallback } from "react";
import classNames from "classnames";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import UserDropdown from "components/UserDropdown";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getLayout, uiActions } from "redux/services/ui/slice";
import { useIsSmall } from "helpers";
import useStyles from "./styles.ts";
import config from "router/Config";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const CustomDrawer = ({ open, setOpen }) => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const classes = useStyles();
  const history = useHistory();
  const isSmall = useIsSmall();

  // TODO: replace "admin" with the dynamic role
  const _routes = config["admin"].drawerItems;
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const layout = useSelector(getLayout);

  const dispatch = useDispatch();
  const updateLayout = useCallback(payload => dispatch(uiActions.updateLayout(payload)), [dispatch]);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const handleListItemClick = useCallback(key => updateLayout({ drawer: { selectedItem: key } }), [updateLayout]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={() => setOpen(false)}
      variant={isSmall ? "temporary" : "permanent"}
      className={classNames(classes.drawer, { open })}
      classes={{ paper: classNames(classes.drawer, { open }) }}>
      <List>
        <Hidden mdUp>
          <ListItem>
            <UserDropdown />
          </ListItem>
        </Hidden>
        {_routes.map((item, i) => (
          <ListItem key={item.key} disablePadding sx={{ display: "block" }} onClick={() => history.push(item.path)}>
            <ListItemButton
              selected={_.isEqual(layout?.drawer?.selectedItem, item?.key)}
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
