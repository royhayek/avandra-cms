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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StatusCell from 'shared/components/DataTable/Cells/Status';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getFaqCategories, getFaqsLoading } from 'redux/faqs/slice';
import { deleteFaqCategoryAction, getFaqCategoriesAction } from 'redux/faqs/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const faqCategories = useAppSelector(getFaqCategories);
  const areFaqCategoriesLoading = useAppSelector(getFaqsLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  // Callbacks
  const fetchFaqCategories = useCallback(() => dispatch(getFaqCategoriesAction()), [dispatch]);

  // Effects
  useEffect(() => {
    fetchFaqCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callbacks
  const handleManageFaqs = useCallback((row) => history.push(`/faq`, row), [history]);

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteFaqCategoryAction(_id));
      if (response.payload.success) fetchFaqCategories();
    },
    [dispatch, fetchFaqCategories]
  );

  const handleRowEdit = useCallback((row) => history.push(`/faqs/form`, row), [history]);

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteFaqCategory = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this category?', {
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
      <Box className={classes.rowActionBtns}>
        <Tooltip title="View Questions">
          <IconButton className={classes.actionBtn} onClick={() => handleManageFaqs(data)}>
            <RemoveRedEyeIcon fontSize="small" color="info" />
          </IconButton>
        </Tooltip>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteFaqCategory(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteFaqCategory, handleRowEdit, handleManageFaqs]
  );

  const getTableHeaders = useMemo(
    () => [
      { field: 'language.label', headerName: 'Language', flex: 0.4, minWidth: 120 },
      { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 200 },
      {
        field: 'enabled',
        headerName: 'Status',
        flex: 0.5,
        minWidth: 150,
        cellRenderer: ({ value }) => <StatusCell value={value} />
      },
      {
        field: 'actions',
        headerName: '',
        resizable: false,
        minWidth: 140,
        cellRenderer: renderRowActions,
        pinned: 'right'
      }
    ],
    [renderRowActions]
  );

  // Renderers Vars
  const tableProps = {
    data: faqCategories,
    columns: getTableHeaders,
    loading: areFaqCategoriesLoading,
    options: {
      rowHeight: 50,
      hasLanguages: true,
      withPagination: false
    }
  };

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">FAQs</Typography>
        <Button text="Add Category" onClick={() => history.push('/faqs/form')} />
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
