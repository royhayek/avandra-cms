// Packages
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useMemo, useCallback, useEffect, useState } from 'react';

// Components
import Card from '../../../../shared/components/Card';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DataTable from '../../../../shared/components/DataTable';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Avatar, Box, Chip, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import * as api from 'redux/category/api';
import { useCommonStyles } from 'shared/assets/styles';
import { statusesList } from 'shared/constants/statuses';
import { CATEGORIES_TABLE_DATA } from 'shared/constants/mock';
import { categoryActions, getCategories } from 'redux/category/slice';

// Component

const Table = () => {
  // Redux
  const dispatch = useDispatch();
  const update = useCallback((payload) => dispatch(categoryActions.update(payload)), [dispatch]);

  const categories = useSelector(getCategories);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  const [loading, setLoading] = useState(false);

  // Callbacks
  const fetchCategories = useCallback(() => {
    setLoading(true);

    api
      .getCategories()
      .then(({ data }) => update({ categories: data?.data }))
      .finally(() => setLoading(false));
  }, [update]);

  // Effects
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callbacks
  const renderImage = useCallback(
    ({ value }) => (
      <Avatar
        alt="image"
        src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/categories/${value}`}
        className={classes.avatar}
      />
    ),
    [classes.avatar]
  );

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

  const handleRowEdit = useCallback((row) => history.push(`/categories/form`, row), [history]);

  const renderRowActions = useCallback(
    ({ row }) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(row)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleRowEdit]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 50 },
      {
        flex: 1,
        minWidth: 100,
        field: 'image',
        headerName: 'Image',
        renderCell: renderImage
      },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 180 },
      {
        flex: 1,
        minWidth: 150,
        field: 'status',
        headerName: 'Status',
        renderCell: renderStatusCell
      },
      {
        flex: 0.5,
        minWidth: 120,
        field: 'actions',
        headerName: '',
        renderCell: renderRowActions
      }
    ],
    [renderImage, renderRowActions, renderStatusCell]
  );

  // Renderers Vars
  const tableProps = {
    data: categories ?? CATEGORIES_TABLE_DATA,
    columns: getTableHeaders
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Categories</Typography>
        <Button text="Add Category" onClick={() => history.push('/categories/form')} />
      </Box>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <DataTable tableProps={tableProps} loading={loading} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Table;
