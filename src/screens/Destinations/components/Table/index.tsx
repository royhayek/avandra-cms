// Packages
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useMemo, useCallback, useEffect } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Avatar, Box, Chip, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { statusesList } from 'shared/constants/statuses';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { getDestinations, getDestinationsLoading } from 'redux/destinations/slice';
import { deleteDestinationAction, getDestinationsAction } from 'redux/destinations/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

  const cities = useAppSelector(getDestinations);
  const areCitiesLoading = useAppSelector(getDestinationsLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchCities = useCallback(() => {
    dispatch(getDestinationsAction());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callbacks
  const renderImage = useCallback(
    ({ value }) => (
      <Avatar
        alt="image"
        variant="rounded"
        sx={{ width: 65, height: 65 }}
        src={`${process.env.REACT_APP_PUBLIC_URL}uploads/destination/image/${value}`}
      />
    ),
    []
  );

  const renderFlag = useCallback(
    ({ value }) => (
      <Avatar
        alt="image"
        variant="square"
        sx={{ width: 30, height: 20 }}
        src={`${process.env.REACT_APP_PUBLIC_URL}uploads/destination/flag/${value}`}
      />
    ),
    []
  );

  const renderTransText = useCallback(
    ({ value }) => <Typography variant="body2">{_.find(value, { type: 'en' })?.content}</Typography>,
    []
  );

  const renderStatusCell = useCallback(
    ({ value }) => {
      const status = _.find(statusesList, { value });

      return (
        <Chip
          size="small"
          label={status?.label}
          sx={{ backgroundColor: status?.color }}
          classes={{ label: classes.statusLabel }}
        />
      );
    },
    [classes.statusLabel]
  );

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteDestinationAction(_id));
      if (response.payload.success) fetchCities();
    },
    [dispatch, fetchCities]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteDestination = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this destination?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const handleRowEdit = useCallback((row) => history.push(`/destinations/form`, row), [history]);

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
      {
        flex: 1,
        minWidth: 100,
        field: 'image',
        headerName: 'Image',
        cellRenderer: renderImage
      },
      {
        minWidth: 100,
        field: 'flag',
        headerName: 'Flag',
        cellRenderer: renderFlag
      },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, cellRenderer: renderTransText },
      { field: 'country', headerName: 'Country', flex: 1, minWidth: 150, cellRenderer: renderTransText },
      { field: 'continent', headerName: 'Continent', flex: 1, minWidth: 150, cellRenderer: renderTransText },
      { field: 'currency', headerName: 'Currency', flex: 1, minWidth: 150, cellRenderer: renderTransText },
      {
        flex: 1,
        minWidth: 150,
        field: 'enabled',
        headerName: 'Status',
        cellRenderer: renderStatusCell
      },
      {
        flex: 0.5,
        minWidth: 120,
        field: 'actions',
        headerName: '',
        cellRenderer: renderRowActions
      }
    ],
    [renderFlag, renderImage, renderRowActions, renderStatusCell, renderTransText]
  );

  // Renderers Vars
  const tableProps = {
    data: cities,
    columns: getTableHeaders,
    loading: areCitiesLoading,
    options: {
      rowHeight: 80
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Destinations</Typography>
        <Button text="Add Destination" onClick={() => history.push('/destinations/form')} />
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
