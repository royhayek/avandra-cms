// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useMemo } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Card from "components/Card";
import BackButton from "components/Buttons/Back";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles } from "lib/styles/index.js";
import useStyles from "./styles.js";
import DataTable from "components/DataTable/index.jsx";
import { statusesList } from "lib/config.js";
import _ from "lodash";
import { PUBLICATIONS_REPORTS_DATA } from "data.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Publications = (props) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //-------------------- CALLBACKS ---------------------//
  const renderStatusCell = useCallback(
    ({ value }) => {
      const status = _.find(statusesList, { value });
      return (
        <Chip
          size="small"
          variant="caption"
          label={status.label}
          color={status.color}
          classes={{ label: classes.statusLabel }}
        />
      );
    },
    [classes.statusLabel]
  );

  const renderRowActions = useCallback(
    ({ row }) => {
      return (
        <Box className={classes.rowActionBtns}>
          <IconButton className={classes.actionBtn}>
            <DeleteRoundedIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      );
    },
    [classes.actionBtn, classes.rowActionBtns]
  );

  const getColumnHeaders = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "reason", headerName: "Reason", flex: 1 },
      { field: "reporter", headerName: "Reporter", flex: 1 },
      { field: "date", headerName: "Date", flex: 1 },
      {
        flex: 1,
        field: "status",
        headerName: "Status",
        renderCell: renderStatusCell,
      },
      {
        flex: 0.5,
        field: "actions",
        headerName: "",
        renderCell: renderRowActions,
      },
    ],
    []
  );
// ---------------------- /Callbacks ----------------------- //
// --------------------------------------------------------- //

// --------------------------------------------------------- //
// ----------------------- Renderers ----------------------- //
  const renderSmall = useMemo(() => {
    // TODO: work on the small layout
  }, []);

  const renderLarge = useMemo(() => {
    const data = PUBLICATIONS_REPORTS_DATA;
    return (
      <>
        <Box className={classes.header}>
          <BackButton />
          <Typography variant="h5">Publications Reports</Typography>
        </Box>

        <Card className={classes.card}>
          <DataTable data={data} columns={getColumnHeaders} />
        </Card>
      </>
    );
  }, [classes.card, classes.header, getColumnHeaders]);



  return renderLarge;
};

export default Publications;
