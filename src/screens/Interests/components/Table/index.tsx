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
import { Box, Grid, IconButton, Typography } from '@mui/material';
import StatusCell from 'shared/components/DataTable/Cells/Status';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { getDataLanguage } from 'redux/services/ui/slice';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getInterests, getInterestsLoading, getInterestsPagination } from 'redux/interests/slice';
import { deleteInterestAction, getInterestsAction } from 'redux/interests/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const interests = useAppSelector(getInterests);
  const dataLang = useAppSelector(getDataLanguage);
  const areInterestsLoading = useAppSelector(getInterestsLoading);
  const interestsPagination = useAppSelector(getInterestsPagination);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchInterests = useCallback(
    (page = 1) => {
      dispatch(getInterestsAction({ lang: dataLang, page }));
    },
    [dataLang, dispatch]
  );

  // Effects
  useEffect(() => {
    fetchInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLang]);

  // Callbacks
  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteInterestAction(_id));
      if (response.payload.success) fetchInterests();
    },
    [dispatch, fetchInterests]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteInterest = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this interest?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const handleRowEdit = useCallback((row) => history.push(`/interests/form`, row), [history]);

  const renderRowActions = useCallback(
    ({ data }) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteInterest(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteInterest, handleRowEdit]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'language.label', headerName: 'Language', flex: 0.5, minWidth: 120 },
      { field: 'title', headerName: 'Title', flex: 1, minWidth: 150 },
      { field: 'icon', headerName: 'Icon', cellStyle: { fontSize: '1.5rem' } },
      {
        flex: 1,
        minWidth: 150,
        field: 'enabled',
        headerName: 'Status',
        cellRenderer: ({ value }) => <StatusCell value={value} />
      },
      { flex: 0.5, minWidth: 120, field: 'actions', headerName: '', cellRenderer: renderRowActions }
    ],
    [renderRowActions]
  );

  // Renderers Vars
  const tableProps = {
    data: interests,
    columns: getTableHeaders,
    loading: areInterestsLoading,
    onRefresh: fetchInterests,
    options: {
      rowHeight: 55,
      hasLanguages: true,
      pagination: interestsPagination
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Interests</Typography>
        <Button text="Add Interest" onClick={() => history.push('/interests/form')} />
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
