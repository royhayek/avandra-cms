// Packages
import { useHistory } from 'react-router-dom';
import React, { useCallback } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { NOTIFICATIONS_TABLE_DATA } from 'shared/constants/mock';

// Component

const Table = () => {
  // Statics
  const classes = useStyles();
  const history = useHistory();

  // Callbacks
  const renderImage = useCallback(({ value }) => <Avatar alt="image" src={value.url} />, []);

  const handleRowEdit = useCallback((row) => history.push(`/notifications/form`, row), [history]);

  const handleSendNotification = useCallback(() => {
    console.debug('send notification');
  }, []);

  const renderRowActions = useCallback(
    ({ row }) => (
      <Box className={classes.rowActionBtns}>
        <Button text="Send" size="small" onClick={handleSendNotification} />
        <IconButton className={classes.actionBtn}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(row)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleRowEdit, handleSendNotification]
  );

  // Renderers Vars
  const getTableHeaders = useCallback(
    () => [
      { field: 'id', headerName: 'ID', flex: 0.2, minWidth: 50 },
      {
        field: 'image',
        headerName: 'Image',
        cellRenderer: renderImage,
        flex: 0.3,
        minWidth: 120
      },
      { field: 'title', headerName: 'Title', flex: 0.6, minWidth: 300 },
      { field: 'message', headerName: 'Message', flex: 1, minWidth: 450 },
      {
        field: 'actions',
        headerName: '',
        cellRenderer: renderRowActions,
        flex: 0.4,
        minWidth: 200
      }
    ],
    [renderImage, renderRowActions]
  );

  const data = NOTIFICATIONS_TABLE_DATA,
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
        <Typography variant="h5">Notifications</Typography>
        <Button text="Add Notification" onClick={() => history.push('/notifications/form')} />
      </Box>

      <Card>
        <Box sx={{ flexGrow: 1 }}>
          <DataTable tableProps={tableProps} />
        </Box>
      </Card>
    </>
  );
};

export default Table;
