// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { memo, useMemo } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Divider } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
//----------------------------------------------------//
//------------------- UTILITIES ----------------------//
//----------------------------------------------------//
import useStyles from "./styles";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const CustomPagination = memo(() => {
  const classes = useStyles();

  //----------------------------------------------------//
  //-------------------- RENDERERS ---------------------//
  const renderSearchField = useMemo(
    () => <GridToolbarQuickFilter className={classes.quickFilter} />,
    [classes.quickFilter]
  );

  const renderDivider = useMemo(
    () => (
      <Divider
        flexItem
        variant="middle"
        orientation="vertical"
        className={classes.divider}
      />
    ),
    [classes.divider]
  );

  const renderTableActions = useMemo(
    () => (
      <Box className={classes.toolbarEndBtnsContainer}>
        <GridToolbarFilterButton />
        {renderDivider}
        <GridToolbarColumnsButton />
        {renderDivider}
        <GridToolbarExport />
      </Box>
    ),
    [classes.toolbarEndBtnsContainer, renderDivider]
  );
  //------------------- /RENDERERS ---------------------//
  //----------------------------------------------------//

  return (
    <GridToolbarContainer>
      {renderSearchField}
      {renderTableActions}
    </GridToolbarContainer>
  );
});

export default CustomPagination;
