// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Card from "../../../../components/Card";
import Button from "components/Buttons/Primary";
import DataTable from "../../../../components/DataTable";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { CATEGORIES_TABLE_DATA } from "../../../../data.js";
import { statusesList } from "lib/config";
import useStyles from "./styles.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const Table = (props) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const classes = useStyles();
  const history = useHistory();
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

  const handleRowEdit = useCallback(
    (row) => history.push(`/categories/form`, row),
    [history]
  );

  const renderRowActions = useCallback(
    ({ row }) => {
      return (
        <Box className={classes.rowActionBtns}>
          <IconButton className={classes.actionBtn}>
            <DeleteRoundedIcon fontSize="small" color="error" />
          </IconButton>
          <IconButton
            className={classes.actionBtn}
            onClick={() => handleRowEdit(row)}
          >
            <EditRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
      );
    },
    [classes.actionBtn, classes.rowActionBtns, handleRowEdit]
  );

  const getTableHeaders = useCallback(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
      {
        flex: 1,
        minWidth: 100,
        field: "image",
        headerName: "Image",
        renderCell: renderImage,
      },
      { field: "title", headerName: "Title", flex: 1, minWidth: 180 },
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
    const data = CATEGORIES_TABLE_DATA,
      columns = getTableHeaders();

    const tableProps = {
      data,
      columns,
      pageSize: 25,
    };
    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Categories</Typography>
          <Button
            text="Add Category"
            onClick={() => history.push("/categories/form")}
          />
        </Box>

        <Card className={classes.card}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              {/* <Form /> */}
              <DataTable {...tableProps} />
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }, [classes.card, classes.header, getTableHeaders, history]);



  return renderContent;
};

export default Table;
