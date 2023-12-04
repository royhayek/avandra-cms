// Packages
import _ from 'lodash';
import React, { useCallback } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Avatar, Box, Chip, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { statusesList } from 'shared/constants/statuses';
import { POSTS_TABLE_DATA } from 'shared/constants/mock';

// Component

const Table = () => {
  // Statics
  const classes = useStyles();

  // Callbacks
  const renderImage = useCallback(({ value }) => <Avatar alt="image" src={value.url} />, []);

  const renderStatusCell = useCallback(
    ({ value }) => {
      const status = _.find(statusesList, { value });

      return (
        <Chip
          size="small"
          label={status?.label}
          sx={{ color: status?.color }}
          classes={{ label: classes.statusLabel }}
        />
      );
    },
    [classes.statusLabel]
  );

  const renderRowActions = useCallback(
    () => (
      <IconButton className={classes.actionBtn}>
        <DeleteRoundedIcon fontSize="small" color="error" />
      </IconButton>
    ),
    [classes.actionBtn]
  );

  const getTableHeaders = useCallback(
    () => [
      { field: 'id', headerName: 'ID', flex: 0.3, width: 50 },
      {
        field: 'image',
        headerName: 'Image',
        renderCell: renderImage,
        flex: 0.5,
        width: 120
      },
      { field: 'title', headerName: 'Title', flex: 1, width: 250 },
      { field: 'views', headerName: 'Views', flex: 0.5, width: 100 },
      { field: 'likes', headerName: 'Likes', flex: 0.5, width: 100 },
      { field: 'reposts', headerName: 'Reposts', flex: 0.5, width: 100 },
      { field: 'replies', headerName: 'Replies', flex: 0.7, width: 100 },
      { field: 'date', headerName: 'Date', flex: 1, width: 180 },
      {
        field: 'status',
        headerName: 'Status',
        renderCell: renderStatusCell,
        flex: 0.7,
        width: 140
      },
      {
        field: 'actions',
        headerName: '',
        renderCell: renderRowActions,
        flex: 0.5,
        width: 100
      }
    ],
    [renderImage, renderRowActions, renderStatusCell]
  );

  // Renderers Vars
  const data = POSTS_TABLE_DATA,
    columns = getTableHeaders();

  const tableProps = {
    data,
    columns,
    pageSize: 25
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Posts</Typography>
      </Box>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <DataTable tableProps={tableProps} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Table;
