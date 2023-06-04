// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import useStyles from "./styles.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const SearchMenu = () => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const classes = useStyles();
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //---------------------- STATE -----------------------//

  //--------------------- /STATE -----------------------//
  //----------------------------------------------------//

  //----------------------------------------------------//
  //------------------- CALLBACKS ----------------------//
  const handleMarkAllAsRead = useCallback(() => {
    // TODO: handle mark all as read button
  }, []);

  const handleViewAll = useCallback(() => {
    // TODO: handle view all button
  }, []);
// ---------------------- /Callbacks ----------------------- //
// --------------------------------------------------------- //

// --------------------------------------------------------- //
// ----------------------- Renderers ----------------------- //
  const renderSearchInput = useCallback(() => {
    return (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }, []);


  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography>Search</Typography>
      </Box>
      <Divider />
      <Box className={classes.body}>{renderSearchInput()}</Box>
    </Box>
  );
};

export default SearchMenu;
