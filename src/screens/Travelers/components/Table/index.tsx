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
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { statusesList } from 'shared/constants/statuses';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { getBudgets, getTravelers, getTravelersLoading } from 'redux/travelers/slice';
import { getTravelersAction, deleteTravelerAction, getBudgetsAction } from 'redux/travelers/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

  const budgets = useAppSelector(getBudgets);
  const travelers = useAppSelector(getTravelers);
  const areTravelersLoading = useAppSelector(getTravelersLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchBudgets = useCallback(() => dispatch(getBudgetsAction()), [dispatch]);

  const fetchTravelers = useCallback(() => dispatch(getTravelersAction()), [dispatch]);

  // Effects
  useEffect(() => {
    fetchTravelers();
    fetchBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callbacks
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
      const response = await dispatch(deleteTravelerAction(_id));
      if (response.payload.success) fetchTravelers();
    },
    [dispatch, fetchTravelers]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteTraveler = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this option?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const handleRowEdit = useCallback((row) => history.push(`/travelOptions/form`, row), [history]);

  const renderRowActions = useCallback(
    ({ data }) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteTraveler(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteTraveler, handleRowEdit]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'title', headerName: 'Title', flex: 1, minWidth: 150, cellRenderer: renderTransText },
      { field: 'description', headerName: 'Description', flex: 1, minWidth: 300, cellRenderer: renderTransText },
      { field: 'icon', headerName: 'Icon' },
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
    [renderRowActions, renderStatusCell, renderTransText]
  );

  // Renderers Vars
  const tableProps = (type) => ({
    data: _.isEqual(type, 'travelers') ? travelers : budgets,
    columns: getTableHeaders,
    loading: areTravelersLoading,
    options: {
      rowHeight: 55,
      withPagination: false
    }
  });

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Travel Options</Typography>
        <Button text="Add Option" onClick={() => history.push('/travelOptions/form')} />
      </Box>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Travelers
            </Typography>
            <DataTable tableProps={tableProps('travelers')} customClass={classes.tableContainer} />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" mt={4} mb={2} fontWeight="bold">
            Budgets
          </Typography>
          <DataTable tableProps={tableProps('budgets')} customClass={classes.tableContainer} />
        </Grid>
      </Card>
    </>
  );
};

export default Table;
