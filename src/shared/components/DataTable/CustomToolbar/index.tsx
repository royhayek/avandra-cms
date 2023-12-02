// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Divider } from '@mui/material';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton
} from '@mui/x-data-grid';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import useStyles from './styles.ts';

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const CustomPagination = () => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const classes = useStyles();
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderSearchField = useMemo(
    () => (
      <GridToolbarQuickFilter
        hiddenLabel
        variant="filled"
        className={classes.quickFilter}
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { fontWeight: 500 } }}
      />
    ),
    [classes.quickFilter]
  );

  const renderDivider = useMemo(
    () => <Divider flexItem variant="middle" orientation="vertical" className={classes.divider} />,
    [classes.divider]
  );

  const renderTableActions = useMemo(
    () => (
      <Box className={classes.toolbarEndBtnsContainer}>
        <GridToolbarFilterButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
        {renderDivider}
        <GridToolbarColumnsButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
        {renderDivider}
        <GridToolbarExport />
      </Box>
    ),
    [classes.toolbarEndBtnsContainer, renderDivider]
  );

  return (
    <GridToolbarContainer>
      {renderSearchField}
      {renderTableActions}
    </GridToolbarContainer>
  );
};

export default CustomPagination;
