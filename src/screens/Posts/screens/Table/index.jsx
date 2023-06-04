// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback } from "react";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Card from "../../../../components/Card";
import DataTable from "../../../../components/DataTable";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { POSTS_TABLE_DATA } from "../../../../data.js";
import { statusesList } from "lib/config";
import useStyles from "./styles.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const Table = (props) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const classes = useStyles();
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //-------------------- CALLBACKS ---------------------//
  const renderImage = useCallback(
    ({ value }) => <Avatar alt="image" src={value.url} />,
    []
  );

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
    ({ row }) => (
      <IconButton className={classes.actionBtn}>
        <DeleteRoundedIcon fontSize="small" color="error" />
      </IconButton>
    ),
    [classes.actionBtn]
  );

  const getTableHeaders = useCallback(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.3, width: 50 },
      {
        field: "image",
        headerName: "Image",
        renderCell: renderImage,
        flex: 0.5,
        width: 120,
      },
      { field: "title", headerName: "Title", flex: 1, width: 250 },
      { field: "views", headerName: "Views", flex: 0.5, width: 100 },
      { field: "likes", headerName: "Likes", flex: 0.5, width: 100 },
      { field: "reposts", headerName: "Reposts", flex: 0.5, width: 100 },
      { field: "replies", headerName: "Replies", flex: 0.7, width: 100 },
      { field: "date", headerName: "Date", flex: 1, width: 180 },
      {
        field: "status",
        headerName: "Status",
        renderCell: renderStatusCell,
        flex: 0.7,
        width: 140,
      },
      {
        field: "actions",
        headerName: "",
        renderCell: renderRowActions,
        flex: 0.5,
        width: 100,
      },
    ];
  }, [renderImage, renderRowActions, renderStatusCell]);
// ---------------------- /Callbacks ----------------------- //
// --------------------------------------------------------- //

// --------------------------------------------------------- //
// ----------------------- Renderers ----------------------- //
  const renderSmall = useMemo(() => {
    // TODO: work on the small layout
  }, []);

  const renderLarge = useMemo(() => {
    const data = POSTS_TABLE_DATA,
      columns = getTableHeaders();

    const tableProps = {
      data,
      columns,
      pageSize: 25,
    };
    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Posts</Typography>
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
