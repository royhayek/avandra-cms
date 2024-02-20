// Packages
import _ from 'lodash';
import { ColDef } from 'ag-grid-community';
import React, { useCallback, useState } from 'react';

// Components
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';

// Utilities
import useStyles from './styles';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// Component
interface DataRow {
  [key: string]: string | number | undefined;
}

interface DataTableProps extends AgGridReactProps {
  tableProps: {
    data: DataRow[];
    columns: ColDef[] | null;
    pageSize?: number;
    loading: boolean;
    options?: {
      rowHeight?: number;
      withoutHeader?: boolean;
    };
  };
  onRowClick?: (rowData: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ tableProps: { data, columns, options }, ...rest }) => {
  // Statics
  const classes = useStyles();

  // Statics
  const [searchText, setSearchText] = useState('');

  // Callbacks
  const onSearchTextChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  // Renderers Vars
  const filteredData = data?.filter((row) =>
    Object.values(row).some((value) => value?.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  // Renderers
  return (
    <>
      <TextField
        size="small"
        label="Search"
        variant="filled"
        value={searchText}
        onChange={onSearchTextChanged}
        className={classes.searchField}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="secondary" />
            </InputAdornment>
          )
        }}
      />
      <div className="ag-theme-material" style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
        <AgGridReact
          pagination
          columnDefs={columns}
          rowData={filteredData}
          paginationPageSize={20}
          className={classes.table}
          rowHeight={options?.rowHeight ?? 60}
          {...rest}
        />
      </div>
    </>
  );
  // return (
  //   <DataGrid
  //     autoHeight
  //     rows={data}
  //     pageSize={10}
  //     headerHeight={40}
  //     columns={finalColumns}
  //     disableSelectionOnClick
  //     rowsPerPageOptions={[5]}
  //     getRowId={(row) => row._id}
  //     rowHeight={options?.rowHeight ?? 60}
  //     localeText={{
  //       toolbarExport: '',
  //       toolbarColumns: '',
  //       toolbarFilters: ''
  //     }}
  //     classes={{
  //       row: classes.row,
  //       root: classes.root,
  //       cell: classes.cell,
  //       filterForm: classes.filterForm,
  //       columnHeader: classes.columnHeader,
  //       columnHeaders: classes.columnHeaders,
  //       columnSeparator: classes.columnSeparator,
  //       footerContainer: classes.footerContainer,
  //       toolbarContainer: classes.toolbarContainer,
  //       columnHeaderTitle: classes.columnHeaderTitle,
  //       filterFormValueInput: classes.filterFormValueInput,
  //       filterFormColumnInput: classes.filterFormColumnInput,
  //       filterFormOperatorInput: classes.filterFormOperatorInput
  //     }}
  //     components={{
  //       Pagination: CustomPagination,
  //       Toolbar: options?.withoutHeader ? null : CustomToolbar
  //     }}
  //     componentsProps={{
  //       toolbar: {
  //         showQuickFilter: true,
  //         quickFilterProps: { debounceMs: 500 }
  //       }
  //     }}
  //     {...rest}
  //   />
  // );
};

DataTable.defaultProps = {
  tableProps: {
    data: [],
    columns: [],
    loading: false,
    options: {
      withoutHeader: false
    }
  }
};

export default DataTable;
