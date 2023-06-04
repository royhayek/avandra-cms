// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from "react";
import _ from "lodash";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import {
  ClickAwayListener,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getLayout } from "services/ui/selectors.js";
import * as actions from "services/ui/actions";
import { useIsSmall } from "helpers";
import config from "router/Config";
import useStyles from "./styles.js";
import UserDropdown from "components/UserDropdown/index.jsx";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const CustomDrawer = ({ open, setOpen }) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const classes = useStyles();
  const history = useHistory();
  const isSmall = useIsSmall();

  // TODO: replace "admin" with the dynamic role
  const _routes = config["admin"].drawerItems;
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //---------------------- REDUX -----------------------//
  const layout = useSelector(getLayout);

  const dispatch = useDispatch();
  const updateLayout = useCallback(
    (payload) => dispatch(actions.updateLayout(payload)),
    [dispatch]
  );
  //--------------------- /REDUX -----------------------//
  //----------------------------------------------------//

  //----------------------------------------------------//
  //------------------- CALLBACKS ----------------------//
  const handleListItemClick = useCallback(
    (key) => updateLayout({ drawer: { selectedItem: key } }),
    [updateLayout]
  );
// ---------------------- /Callbacks ----------------------- //
// --------------------------------------------------------- //

  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={() => setOpen(false)}
      variant={isSmall ? "temporary" : "permanent"}
      className={classNames(classes.drawer, { open })}
      classes={{ paper: classNames(classes.drawer, { open }) }}
    >
      <List>
        <Hidden mdUp>
          <ListItem>
            <UserDropdown />
          </ListItem>
        </Hidden>
        {_routes.map((item, i) => (
          <ListItem
            key={item.key}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => history.push(item.path)}
          >
            <ListItemButton
              selected={_.isEqual(layout?.drawer?.selectedItem, item?.key)}
              onClick={() => handleListItemClick(item.key)}
              className={classNames(classes.listItemButton, { open })}
            >
              <ListItemIcon
                color="inherit"
                className={classNames(classes.listItemIcon, { open })}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                className={classNames(classes.listItemText, { open })}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
