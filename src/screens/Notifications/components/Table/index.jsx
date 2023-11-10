// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
// import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DataTable from "../../../../components/DataTable";
import Button from "components/Buttons/Primary";
import Card from "../../../../components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { NOTIFICATIONS_TABLE_DATA } from "../../../../data";
// import { statusesList } from "lib/config";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Table = () => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const classes = useStyles();
  const history = useHistory();
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const renderImage = useCallback(({ value }) => <Avatar alt="image" src={value.url} />, []);

  // const renderStatusCell = useCallback(
  //   ({ value }) => {
  //     const status = _.find(statusesList, { value });
  //     return (
  //       <Chip
  //         size="small"
  //         variant="caption"
  //         label={status.label}
  //         color={status.color}
  //         classes={{ label: classes.statusLabel }}
  //       />
  //     );
  //   },
  //   [classes.statusLabel],
  // );

  const handleRowEdit = useCallback(row => history.push(`/notifications/form`, row), [history]);

  const handleSendNotification = useCallback(() => {
    console.debug("send notification");
  }, []);

  const renderRowActions = useCallback(
    ({ row }) => {
      return (
        <Box className={classes.rowActionBtns}>
          <Button text="Send" size="small" onClick={handleSendNotification} />
          <IconButton className={classes.actionBtn}>
            <DeleteRoundedIcon fontSize="small" color="error" />
          </IconButton>
          <IconButton className={classes.actionBtn} onClick={() => handleRowEdit(row)}>
            <EditRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
      );
    },
    [classes.actionBtn, classes.rowActionBtns, handleRowEdit, handleSendNotification],
  );

  const getTableHeaders = useCallback(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.2, minWidth: 50 },
      {
        field: "image",
        headerName: "Image",
        renderCell: renderImage,
        flex: 0.3,
        minWidth: 120,
      },
      { field: "title", headerName: "Title", flex: 0.6, minWidth: 300 },
      { field: "message", headerName: "Message", flex: 1, minWidth: 450 },
      {
        field: "actions",
        headerName: "",
        renderCell: renderRowActions,
        flex: 0.4,
        minWidth: 200,
      },
    ];
  }, [renderImage, renderRowActions]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  // const renderSmall = useMemo(() => {
  //   // TODO: work on the small layout
  // }, []);

  const renderLarge = useMemo(() => {
    const data = NOTIFICATIONS_TABLE_DATA,
      columns = getTableHeaders();

    const tableProps = {
      data,
      columns,
      pageSize: 25,
    };
    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Notifications</Typography>
          <Button text="Add Notification" onClick={() => history.push("/notifications/form")} />
        </Box>

        <Card className={classes.card}>
          <Box sx={{ flexGrow: 1 }}>
            <DataTable tableProps={tableProps} />
          </Box>
        </Card>
      </>
    );
  }, [classes.card, classes.header, getTableHeaders, history]);

  return renderLarge;
};

export default Table;
