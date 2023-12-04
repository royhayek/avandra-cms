// Packages
import _ from 'lodash';
import React, { useMemo } from 'react';

// Components
import CustomToolbar from './CustomToolbar';
import CustomPagination from './CustomPagination';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';

// Utilities
import useStyles from './styles';
import { useIsSmall } from 'shared/utils';

// Component
interface DataTableProps {
  tableProps: {
    data: Array<unknown>;
    columns: GridColDef[];
    pageSize?: number;
    options?: {
      withoutHeader?: boolean;
    };
  };
}

const DataTable = ({
  tableProps: { data, columns, options },
  ...rest
}: DataTableProps & Omit<DataGridProps, 'rows' | 'columns'>) => {
  // Statics
  const classes = useStyles();
  const isSmall = useIsSmall();

  // Renderers Vars
  const finalColumns = useMemo(() => _.map(columns, (c) => ({ ...c, flex: isSmall ? 0 : c.flex })), [columns, isSmall]);

  // Renderers
  return (
    <DataGrid
      autoHeight
      rows={data}
      pageSize={10}
      rowHeight={60}
      headerHeight={40}
      columns={finalColumns}
      disableSelectionOnClick
      rowsPerPageOptions={[5]}
      getRowId={(row) => row._id}
      localeText={{
        toolbarExport: '',
        toolbarColumns: '',
        toolbarFilters: ''
      }}
      classes={{
        row: classes.row,
        root: classes.root,
        cell: classes.cell,
        filterForm: classes.filterForm,
        columnHeader: classes.columnHeader,
        columnHeaders: classes.columnHeaders,
        columnSeparator: classes.columnSeparator,
        footerContainer: classes.footerContainer,
        toolbarContainer: classes.toolbarContainer,
        columnHeaderTitle: classes.columnHeaderTitle,
        filterFormValueInput: classes.filterFormValueInput,
        filterFormColumnInput: classes.filterFormColumnInput,
        filterFormOperatorInput: classes.filterFormOperatorInput
      }}
      components={{
        Pagination: CustomPagination,
        Toolbar: options?.withoutHeader ? null : CustomToolbar
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 }
        }
      }}
      {...rest}
    />
  );
};

DataTable.defaultProps = {
  tableProps: {
    data: [],
    columns: [],
    options: {
      withoutHeader: false
    }
  }
};

export default DataTable;
