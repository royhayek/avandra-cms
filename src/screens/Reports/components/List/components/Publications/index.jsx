// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useMemo } from "react";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Chip, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import BackButton from "components/Buttons/Back";
import DataTable from "components/DataTable";
import Card from "components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { PUBLICATIONS_REPORTS_DATA } from "data";
import { useCommonStyles } from "lib/styles/index.ts";
import { statusesList } from "lib/config";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Publications = () => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
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
    [classes.statusLabel],
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
    [classes.actionBtn, classes.rowActionBtns],
  );

  const getTableHeaders = useMemo(
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
    [renderRowActions, renderStatusCell],
  );
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  // const renderSmall = useMemo(() => {
  //   // TODO: work on the small layout
  // }, []);
  const data = PUBLICATIONS_REPORTS_DATA,
    columns = getTableHeaders;

  const tableProps = {
    data,
    columns,
  };

  return (
    <>
      <Box className={classes.header}>
        <BackButton />
        <Typography variant="h5">Publications Reports</Typography>
      </Box>

      <Card className={classes.card}>
        <DataTable tableProps={tableProps} />
      </Card>
    </>
  );
};

export default Publications;
