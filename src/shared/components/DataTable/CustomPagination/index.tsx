// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const CustomPagination = () => {
  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <Pagination
      color="primary"
      page={page + 1}
      count={pageCount}
      onChange={(e, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

export default CustomPagination;
