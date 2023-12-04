// Packages
import React, { /* useCallback, */ useMemo } from 'react';

// Components
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material';

// Utilities
import useStyles from './styles.ts';

// Component

const SearchMenu = () => {
  // Statics
  const classes = useStyles();

  // Callbacks
  // const handleMarkAllAsRead = useCallback(() => {
  //   // TODO: handle mark all as read button
  // }, []);

  // const handleViewAll = useCallback(() => {
  //   // TODO: handle view all button
  // }, []);

  // Renderers

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
