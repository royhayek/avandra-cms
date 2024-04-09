// Packages
import _ from 'lodash';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useMemo, useCallback, useEffect } from 'react';

// Components
import Card from 'shared/components/Card';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import StatusCell from 'shared/components/DataTable/Cells/Status';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getBudgets, getTravelers, getTravelersLoading } from 'redux/traveloption/slice';
import {
  getTravelersAction,
  deleteTravelerAction,
  getBudgetsAction,
  deleteBudgetAction
} from 'redux/traveloption/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const budgets = useAppSelector(getBudgets);
  const travelers = useAppSelector(getTravelers);
  const areTravelersLoading = useAppSelector(getTravelersLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  const sortedTravelers = useMemo(() => _.sortBy(travelers, '_id'), [travelers]);
  const sortedBudgets = useMemo(() => _.sortBy(budgets, '_id'), [budgets]);

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
  const handleDelete = useCallback(
    async ({ closeToast, _id, type }) => {
      closeToast();

      const response = _.isEqual(type, 'travelers')
        ? await dispatch(deleteTravelerAction(_id))
        : await dispatch(deleteBudgetAction(_id));

      if (response.payload.success) fetchTravelers();
    },
    [dispatch, fetchTravelers]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteTraveler = useCallback(
    ({ _id }, type) => {
      toast(`Would you like to delete this ${_.isEqual(type, 'travelers') ? 'traveler' : 'budget'}?`, {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} type={type} {...props} />
      });
    },
    [CloseButton]
  );

  const handleRowEdit = useCallback(
    (row, type) =>
      history.push(`/travelOptions/form`, { data: row, type: _.isEqual(type, 'travelers') ? 'traveler' : 'budget' }),
    [history]
  );

  const renderRowActions = useCallback(
    (data, type) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteTraveler(data, type)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data, type)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteTraveler, handleRowEdit]
  );

  const getTableHeaders = useCallback(
    (type) => [
      { field: 'language.label', headerName: 'Language', flex: 0.5, minWidth: 120 },
      { field: 'title', headerName: 'Title', flex: 1, minWidth: 150 },
      { field: 'description', headerName: 'Description', flex: 1, minWidth: 300 },
      { field: 'icon', headerName: 'Icon', cellStyle: { fontSize: '1.5rem' } },
      {
        flex: 1,
        minWidth: 150,
        field: 'enabled',
        headerName: 'Status',
        cellRenderer: ({ value }) => <StatusCell value={value} />
      },
      {
        flex: 0.5,
        minWidth: 120,
        field: 'actions',
        headerName: '',
        cellRenderer: ({ data }) => renderRowActions(data, type)
      }
    ],
    [renderRowActions]
  );

  // Renderers Vars
  const tableProps = (type) => ({
    data: _.isEqual(type, 'travelers') ? sortedTravelers : sortedBudgets,
    columns: getTableHeaders(type),
    loading: areTravelersLoading,
    options: {
      rowHeight: 55,
      hasLanguages: true
    }
  });

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Travel Options</Typography>
      </Box>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Box className={classNames(classes.row, 'expand away')}>
              <Typography variant="h6" mb={2} fontWeight="bold">
                Travelers
              </Typography>
              <Button text="Add Traveler" onClick={() => history.push('/travelOptions/form', { type: 'traveler' })} />
            </Box>
            <DataTable tableProps={tableProps('travelers')} customClass={classes.tableContainer} />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box className={classNames(classes.row, 'expand away')} mt={4} mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Budgets
            </Typography>
            <Button text="Add Budget" onClick={() => history.push('/travelOptions/form', { type: 'budget' })} />
          </Box>
          <DataTable tableProps={tableProps('budgets')} customClass={classes.tableContainer} />
        </Grid>
      </Card>
    </>
  );
};

export default Table;
