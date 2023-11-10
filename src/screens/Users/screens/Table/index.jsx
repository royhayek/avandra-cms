// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback, useEffect, useState } from "react";
import { /* useSelector, */ useDispatch } from "react-redux";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DataTable from "components/DataTable";
import Card from "components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { /* getUsers, */ userActions } from "redux/user/slice";
import { useCommonStyles } from "lib/styles/index.ts";
import { USERS_TABLE_DATA } from "data";
import * as api from "redux/user/api";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Table = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch();
  const updateUsers = useCallback(payload => dispatch(userActions.update(payload)), [dispatch]);

  // const users = useSelector(getUsers);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const fetchUsers = useCallback(() => {
    setLoading(true);
    api
      .getUsers()
      .then(({ data }) => updateUsers({ users: data?.data }))
      .finally(() => setLoading(false));
  }, [updateUsers]);

  const renderStatusCell = useCallback(
    ({ value }) => {
      return <Chip label={value} color="success" size="small" classes={{ label: classes.statusLabel }} />;
    },
    [classes.statusLabel],
  );

  const renderRowActions = useCallback(
    ({ value }) => {
      return (
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
      );
    },
    [classes.actionBtn, classes.rowActionBtns],
  );

  const getTableHeaders = useCallback(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "firstName", headerName: "First Name", flex: 1 },
      {
        flex: 1,
        field: "lastName",
        headerName: "Last Name",
        sortable: false,
      },
      {
        flex: 0.5,
        field: "status",
        headerName: "Status",
        renderCell: renderStatusCell,
      },
      {
        flex: 0.7,
        minWidth: 170,
        field: "actions",
        headerName: "",
        renderCell: renderRowActions,
      },
    ];
  }, [renderRowActions, renderStatusCell]);
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
      data: USERS_TABLE_DATA,
      columns,
      pageSize: 25,
    };

    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Users</Typography>
        </Box>

        <Card className={classes.card}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <DataTable tableProps={tableProps} />
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }, [classes.card, classes.header, getTableHeaders]);

  return renderLarge;
};

export default Table;
