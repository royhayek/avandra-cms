// Packages
import _ from 'lodash';
import { toast } from 'react-toastify';
import React, { useMemo, useCallback, useEffect } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import ArchiveIcon from '@mui/icons-material/Archive';
import Button from 'shared/components/Buttons/Primary';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { messageStatusesList } from 'shared/constants/statuses';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getMessages, getMessagesLoading } from 'redux/messages/slice';
import { deleteMessageAction, getMessagesAction, modifyMessageAction } from 'redux/messages/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const messages = useAppSelector(getMessages);
  const areMessagesLoading = useAppSelector(getMessagesLoading);

  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchMessages = useCallback(() => dispatch(getMessagesAction()), [dispatch]);

  // Effects
  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callbacks
  const handleUpdateStatus = useCallback(
    async ({ _id, status }, archive) => {
      const response = await dispatch(
        modifyMessageAction({
          _id,
          status:
            _.isEqual(status, 'read') && !archive
              ? 'unread'
              : (_.isEqual(status, 'read') || _.isEqual(status, 'unread')) && archive
                ? 'archived'
                : 'read'
        })
      );

      if (response.payload.success) fetchMessages();
    },
    [dispatch, fetchMessages]
  );

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteMessageAction(_id));
      if (response.payload.success) fetchMessages();
    },
    [dispatch, fetchMessages]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteMessage = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this message?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const renderStatus = useCallback(
    ({ value, data }) => {
      return (
        <Tooltip title={_.isEqual(value, 'read') ? 'Mark as unread' : 'Mark as read'}>
          <Chip
            size="medium"
            disabled={_.isEqual(value, 'archived')}
            classes={{ label: classes.statusLabel }}
            onClick={() => handleUpdateStatus(data, false)}
            label={_.find(messageStatusesList, { value })?.label}
          />
        </Tooltip>
      );
    },
    [classes.statusLabel, handleUpdateStatus]
  );

  const renderRowActions = useCallback(
    ({ data }) => (
      <Box className={classes.rowActionBtns}>
        <Tooltip title={_.isEqual(data?.status, 'archived') ? 'Unarchive' : 'Archive'}>
          <IconButton className={classes.actionBtn} onClick={() => handleUpdateStatus(data, true)}>
            {_.isEqual(data?.status, 'archived') ? (
              <UnarchiveIcon fontSize="small" color="info" />
            ) : (
              <ArchiveIcon fontSize="small" color="info" />
            )}
          </IconButton>
        </Tooltip>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteMessage(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteMessage, handleUpdateStatus]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'type', headerName: 'Type', flex: 0.4 },
      { field: 'user.name', headerName: 'From', flex: 0.5 },
      { field: 'user.email', headerName: 'Email', flex: 1 },
      { field: 'message', headerName: 'Message', flex: 2, cellStyle: { textWrap: 'wrap', lineHeight: '1.5rem' } },
      { field: 'status', headerName: 'Status', flex: 0.5, cellRenderer: renderStatus },
      { width: 120, field: 'actions', headerName: '', cellRenderer: renderRowActions }
    ],
    [renderRowActions, renderStatus]
  );

  // Renderers Vars
  const tableProps = {
    data: messages,
    columns: getTableHeaders,
    loading: areMessagesLoading,
    options: {
      rowHeight: 100,
      withPagination: false
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Messages</Typography>
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
