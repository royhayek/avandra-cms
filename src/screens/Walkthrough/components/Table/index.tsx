// Packages
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useMemo, useCallback, useEffect } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getWalkthrough, getWalkthroughLoading } from 'redux/walkthrough/slice';
import { deleteWalkthroughAction, getWalkthroughAction } from 'redux/walkthrough/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const walkthrough = useAppSelector(getWalkthrough);
  const isWalkthroughLoading = useAppSelector(getWalkthroughLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchWalkthrough = useCallback(() => {
    dispatch(getWalkthroughAction());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    fetchWalkthrough();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callbacks
  const renderImage = useCallback(
    ({ value }) => (
      <Avatar
        alt="image"
        variant="rounded"
        sx={{ width: 80, height: 180 }}
        src={`${process.env.REACT_APP_PUBLIC_URL}uploads/walkthrough/image/${value}`}
      />
    ),
    []
  );

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteWalkthroughAction(_id));
      if (response.payload.success) fetchWalkthrough();
    },
    [dispatch, fetchWalkthrough]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteDestination = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this walkthrough?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const handleRowEdit = useCallback((row) => history.push(`/walkthrough/form`, row), [history]);

  const renderRowActions = useCallback(
    ({ data }) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteDestination(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteDestination, handleRowEdit]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'language.label', headerName: 'Language', flex: 0.5, minWidth: 100 },
      { field: 'image', headerName: 'Image', cellRenderer: renderImage, flex: 0.5, minWidth: 60 },
      { field: 'title', headerName: 'Title', flex: 1, minWidth: 250 },
      {
        field: 'description',
        headerName: 'Description',
        cellStyle: { textWrap: 'wrap', lineHeight: '1.5rem' },
        minWidth: 300,
        flex: 2
      },
      { width: 150, field: 'actions', headerName: '', cellRenderer: renderRowActions }
    ],
    [renderImage, renderRowActions]
  );

  // Renderers Vars
  const tableProps = {
    data: walkthrough,
    columns: getTableHeaders,
    loading: isWalkthroughLoading,
    options: {
      rowHeight: 200
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Walkthrough</Typography>
        <Button text="Add Walthrough" onClick={() => history.push('/walkthrough/form')} />
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
