// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DataTable from "../../../../components/DataTable";
import Button from "components/Buttons/Primary";
import Card from "../../../../components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { categoryActions, getCategories } from "redux/category/slice";
import { useCommonStyles } from "lib/styles/index.ts";
import { CATEGORIES_TABLE_DATA } from "data";
import * as api from "redux/category/api";
import { statusesList } from "lib/config";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Table = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch();
  const update = useCallback(payload => dispatch(categoryActions.update(payload)), [dispatch]);

  const categories = useSelector(getCategories);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...styles }), [commonStyles, styles]);

  const [loading, setLoading] = useState(false);
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const fetchCategories = useCallback(() => {
    setLoading(true);
    api
      .getCategories()
      .then(({ data }) => update({ categories: data?.data }))
      .finally(() => setLoading(false));
  }, [update]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Effects ------------------------ //
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const renderImage = useCallback(
    ({ value }) => (
      <Avatar
        alt="image"
        src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/categories/${value}`}
        className={classes.avatar}
      />
    ),
    [classes.avatar],
  );

  const renderStatusCell = useCallback(
    ({ value }) => {
      const status = _.find(statusesList, { value });
      return (
        <Chip
          size="small"
          variant="caption"
          label={status?.label}
          color={status?.color}
          classes={{ label: classes.statusLabel }}
        />
      );
    },
    [classes.statusLabel],
  );

  const handleRowEdit = useCallback(row => history.push(`/categories/form`, row), [history]);

  const renderRowActions = useCallback(
    ({ row }) => {
      return (
        <Box className={classes.rowActionBtns}>
          <IconButton className={classes.actionBtn}>
            <DeleteRoundedIcon fontSize="small" color="error" />
          </IconButton>
          <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(row)}>
            <EditRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
      );
    },
    [classes.actionBtn, classes.rowActionBtns, handleRowEdit],
  );

  const getTableHeaders = useMemo(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
      {
        flex: 1,
        minWidth: 100,
        field: "image",
        headerName: "Image",
        renderCell: renderImage,
      },
      { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
      {
        flex: 1,
        minWidth: 150,
        field: "status",
        headerName: "Status",
        renderCell: renderStatusCell,
      },
      {
        flex: 0.5,
        minWidth: 120,
        field: "actions",
        headerName: "",
        renderCell: renderRowActions,
      },
    ];
  }, [renderImage, renderRowActions, renderStatusCell]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderContent = useMemo(() => {
    const tableProps = {
      data: categories ?? CATEGORIES_TABLE_DATA,
      columns: getTableHeaders,
    };
    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Categories</Typography>
          <Button text="Add Category" onClick={() => history.push("/categories/form")} />
        </Box>

        <Card className={classes.card}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              {/* <Form /> */}
              <DataTable tableProps={tableProps} loading={loading} />
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }, [loading, categories, classes.card, classes.header, getTableHeaders, history]);

  return renderContent;
};

export default Table;
