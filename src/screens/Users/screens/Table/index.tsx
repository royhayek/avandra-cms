// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DataTable from 'shared/components/DataTable';
import Card from 'shared/components/Card';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { getUsers, getUsersError, getUsersLoading } from 'redux/user/slice';
import { statusesList } from 'shared/constants/statuses';
import { useCommonStyles } from 'shared/assets/styles';
import { getUsersList } from 'redux/user/thunks';
import useStyles from './styles';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Table = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch<AppThunkDispatch>();

  const users = useAppSelector(getUsers);
  const usersError = useAppSelector(getUsersError);
  const isUsersLoading = useAppSelector(getUsersLoading);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const fetchUsers = useCallback(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const renderRoleCell = useCallback(
    ({ value }) => <Typography variant="body2">{value.charAt(0).toUpperCase() + value.slice(1)}</Typography>,
    []
  );

  const renderStatusCell = useCallback(
    ({ value }) => {
      const status = _.find(statusesList, { value });

      return (
        <Chip
          size="small"
          label={status?.label}
          sx={{ backgroundColor: status?.color, color: 'white' }}
          classes={{ label: classes.statusLabel }}
        />
      );
    },
    [classes.statusLabel]
  );

  const renderRowActions = useCallback(
    () => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton className={classes.actionBtn}>
          <MoreVertRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns]
  );

  const getTableHeaders = useCallback(() => {
    return [
      { field: '_id', headerName: 'ID', flex: 0.7 },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 0.5, renderCell: renderRoleCell },
      {
        flex: 0.5,
        field: 'status',
        headerName: 'Status',
        renderCell: renderStatusCell
      },
      {
        flex: 0.7,
        minWidth: 170,
        field: 'actions',
        headerName: '',
        renderCell: renderRowActions
      }
    ];
  }, [renderRoleCell, renderRowActions, renderStatusCell]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Effects ------------------------ //
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderLarge = useMemo(() => {
    const columns = getTableHeaders();

    const tableProps = {
      data: users,
      columns,
      pageSize: 25
    };

    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Users</Typography>
        </Box>

        <Card>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <DataTable tableProps={tableProps} loading={isUsersLoading} error={usersError} />
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }, [classes.header, getTableHeaders, isUsersLoading, users, usersError]);

  return renderLarge;
};

export default Table;
