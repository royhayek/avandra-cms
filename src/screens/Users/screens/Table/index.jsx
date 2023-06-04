// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import Card from "components/Card";
import DataTable from "components/DataTable";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { USERS_TABLE_DATA } from "data.js";
import { useCommonStyles } from "lib/styles";
import useStyles from "./styles.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const Table = (props) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

// --------------------------------------------------------- //
// ----------------------- Callbacks ----------------------- //
  const renderStatusCell = useCallback(
    ({ value }) => {
      return (
        <Chip
          label={value}
          color="success"
          size="small"
          classes={{ label: classes.statusLabel }}
        />
      );
    },
    [classes.statusLabel]
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
    [classes.actionBtn, classes.rowActionBtns]
  );

  const getTableHeaders = useCallback(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "firstName", headerName: "First name", flex: 1 },
      { field: "lastName", headerName: "Last name", flex: 1 },
      {
        flex: 0.5,
        field: "status",
        headerName: "Status",
        renderCell: renderStatusCell,
      },
      {
        flex: 1,
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        valueGetter: (params) =>
          `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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
// ----------------------- Renderers ----------------------- //
  const renderLarge = useMemo(() => {
    const data = USERS_TABLE_DATA,
      columns = getTableHeaders();

    const tableProps = {
      data,
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
              <DataTable {...tableProps} />
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }, [classes.card, classes.header, getTableHeaders]);



  return renderLarge;
};

export default Table;
