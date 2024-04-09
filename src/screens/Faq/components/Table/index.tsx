// Packages
import _ from 'lodash';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useMemo, useCallback, useEffect } from 'react';

// Components
import Card from 'shared/components/Card';
import { ArrowBack } from '@mui/icons-material';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import StatusCell from 'shared/components/DataTable/Cells/Status';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getFaqQuestions, getFaqsLoading } from 'redux/faqs/slice';
import { deleteFaqQuestionAction, getFaqQuestionsAction } from 'redux/faqs/thunks';

// Interfaces
import { FaqCategoryProps } from 'shared/types/FaqCategory';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const faqQuestions = useAppSelector(getFaqQuestions);
  const areFaqCategoriesLoading = useAppSelector(getFaqsLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  const faqCategory = history.location.state as FaqCategoryProps;

  // Callbacks
  const fetchFaqQuestions = useCallback(
    () => dispatch(getFaqQuestionsAction(faqCategory?._id)),
    [dispatch, faqCategory?._id]
  );

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteFaqQuestionAction(_id));
      if (response.payload.success) fetchFaqQuestions();
    },
    [dispatch, fetchFaqQuestions]
  );

  const handleRowEdit = useCallback((row) => history.push(`/faq/form`, { faq: row }), [history]);

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleDeleteFaqCategory = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this question?', {
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
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteFaqCategory(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [classes.actionBtn, classes.rowActionBtns, handleDeleteFaqCategory, handleRowEdit]
  );

  // Effects
  useEffect(() => {
    fetchFaqQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderers Vars
  const getTableHeaders = useMemo(
    () => [
      { field: 'language.label', headerName: 'Language', flex: 0.4, minWidth: 120 },
      { field: 'order', headerName: 'Order', flex: 0.5, minWidth: 100 },
      { field: 'question', headerName: 'Question', flex: 0.5, minWidth: 200 },
      {
        field: 'enabled',
        headerName: 'Status',
        flex: 0.5,
        minWidth: 150,
        cellRenderer: ({ value }) => <StatusCell value={value} />
      },
      { field: 'actions', headerName: '', flex: 0.5, minWidth: 120, cellRenderer: renderRowActions }
    ],
    [renderRowActions]
  );

  const tableProps = {
    data: faqQuestions,
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
        <Box className={classNames(classes.row, 'center')} sx={{ gap: 1 }}>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5">Questions - {faqCategory?.name} </Typography>
        </Box>
        <Button text="Add Question" onClick={() => history.push('/faq/form', { faqCategory: faqCategory })} />
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
