// Packages
import _ from 'lodash';
import { toast } from 'react-toastify';
import React, { useCallback, useEffect } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import StatusCell from 'shared/components/DataTable/Cells/Status';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { deleteTripAction, getTripsAction } from 'redux/trips/thunks';
import { tripStatusesList } from 'shared/constants/statuses';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getTrips, getTripsLoading } from 'redux/trips/slice';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const trips = useAppSelector(getTrips);
  const areTripsLoading = useAppSelector(getTripsLoading);

  // Statics
  const classes = useStyles();

  // Callbacks
  const fetchTrips = useCallback(() => {
    dispatch(getTripsAction());
  }, [dispatch]);

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteTripAction(_id));
      if (response.payload.success) fetchTrips();
    },
    [dispatch, fetchTrips]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteTrip = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this trip?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const renderRowActions = useCallback(
    ({ data }) => (
      <IconButton className={classes.actionBtn} onClick={() => handleDeleteTrip(data)}>
        <DeleteRoundedIcon fontSize="small" color="error" />
      </IconButton>
    ),
    [classes.actionBtn, handleDeleteTrip]
  );

  const renderTraveler = useCallback(
    ({ value }) => value && <Chip variant="outlined" label={`${value.title} ${value.icon}`} />,
    []
  );

  const renderBudget = useCallback(
    ({ value }) => value && <Chip variant="outlined" label={`${value.title} ${value.icon}`} />,
    []
  );

  const getTableHeaders = useCallback(
    () => [
      { field: 'language.label', headerName: 'Language', flex: 0.5, width: 120 },
      { field: 'name', headerName: 'Name', flex: 0.5, width: 100 },
      { field: 'country', headerName: 'Country', flex: 0.5, width: 100 },
      { field: 'fromDate', headerName: 'From Date', flex: 0.5, width: 120 },
      { field: 'toDate', headerName: 'To Date', flex: 0.5, width: 120 },
      { field: 'traveler', headerName: 'Traveler', flex: 0.5, width: 120, cellRenderer: renderTraveler },
      { field: 'budget', headerName: 'Budget', flex: 0.5, width: 120, cellRenderer: renderBudget },
      { field: 'user.name', headerName: 'User', flex: 0.7, width: 150 },
      {
        field: 'status',
        headerName: 'Status',
        flex: 0.7,
        width: 140,
        cellRenderer: ({ value }) => <StatusCell value={value} statuses={tripStatusesList} />
      },
      { field: 'actions', headerName: '', flex: 0.5, width: 100, cellRenderer: renderRowActions }
    ],
    [renderBudget, renderRowActions, renderTraveler]
  );

  // Effects
  useEffect(() => {
    dispatch(getTripsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderers Vars
  const data = trips,
    columns = getTableHeaders();

  const tableProps = {
    data,
    columns,
    pageSize: 25,
    loading: areTripsLoading,
    options: {
      rowHeight: 80
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Trips</Typography>
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
