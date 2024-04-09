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
import StatusCell from 'shared/components/DataTable/Cells/Status';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { selectArticles, selectArticlesLoading } from 'redux/articles/slice';
import { deleteArticleAction, getArticlesAction } from 'redux/articles/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const articles = useAppSelector(selectArticles);
  const areArticlesLoading = useAppSelector(selectArticlesLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchCities = useCallback(() => {
    dispatch(getArticlesAction());
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
        src={`${process.env.REACT_APP_PUBLIC_URL}uploads/article/image/${value}`}
      />
    ),
    []
  );

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteArticleAction(_id));
      if (response.payload.success) fetchCities();
    },
    [dispatch, fetchCities]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteArticle = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this article?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const handleRowEdit = useCallback((row) => history.push(`/articles/form`, row), [history]);

  const renderRowActions = useCallback(
    ({ data }) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteArticle(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteArticle, handleRowEdit]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'language.label', headerName: 'Language', flex: 0.5, minWidth: 120 },
      { field: 'image', headerName: 'Image', cellRenderer: renderImage, flex: 0.5, minWidth: 100 },
      { field: 'name', headerName: 'Name', flex: 2, minWidth: 200 },
      { field: 'date', headerName: 'Country', flex: 1, minWidth: 120 },
      {
        flex: 0.5,
        minWidth: 150,
        field: 'enabled',
        headerName: 'Status',
        cellRenderer: ({ value }) => <StatusCell value={value} />
      },
      { flex: 0.5, minWidth: 120, field: 'actions', headerName: '', cellRenderer: renderRowActions }
    ],
    [renderImage, renderRowActions]
  );

  // Renderers Vars
  const tableProps = {
    data: articles,
    columns: getTableHeaders,
    loading: areArticlesLoading,
    options: {
      rowHeight: 80,
      hasLanguages: true
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Articles</Typography>
        <Button text="Add Article" onClick={() => history.push('/articles/form')} />
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
