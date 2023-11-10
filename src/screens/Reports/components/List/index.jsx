// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Grid, Typography } from "@mui/material";
import Card from "components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { reportsList } from "./config";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const List = () => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const classes = useStyles();
  const history = useHistory();
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const handleItemClick = useCallback(key => history.push(`/reports/${key}`), [history]);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderItem = useCallback(
    ({ key, label, description }) => (
      <Grid item xs={12} sm={12} md={4} key={key} onClick={() => handleItemClick(key)}>
        <Box className={classes.itemContainer}>
          <Typography variant="body1">{label}</Typography>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Grid>
    ),
    [classes.itemContainer, handleItemClick],
  );

  // const renderSmall = useMemo(() => {
  //   // TODO: work on the small layout
  // }, []);

  const renderLarge = useMemo(() => {
    return (
      <>
        <Box className={classes.header}>
          <Typography variant="h5">Reports</Typography>
        </Box>

        <Card className={classes.card}>
          <Grid container spacing={3}>
            {_.map(reportsList, renderItem)}
          </Grid>
        </Card>
      </>
    );
  }, [classes.card, classes.header, renderItem]);

  return renderLarge;
};

export default List;
