// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { /* useCallback, */ useMemo } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const SearchMenu = () => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const classes = useStyles();
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- Callbacks ------------------------ //
  // const handleMarkAllAsRead = useCallback(() => {
  //   // TODO: handle mark all as read button
  // }, []);

  // const handleViewAll = useCallback(() => {
  //   // TODO: handle view all button
  // }, []);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderSearchInput = useMemo(
    () => (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          )
        }}
      />
    ),
    []
  );

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography>Search</Typography>
      </Box>
      <Divider />
      <Box className={classes.body}>{renderSearchInput}</Box>
    </Box>
  );
};

export default SearchMenu;
