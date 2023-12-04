// Packages
import React from 'react';

// Components
import { Pagination } from '@mui/material';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';

// Component

const CustomPagination = () => {
  // Renderers Vars
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  // Renderers
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
