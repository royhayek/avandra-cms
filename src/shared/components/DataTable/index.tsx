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
import classNames from 'classnames';

// Component
interface DataRow {
  [key: string]: string | number | undefined;
}

interface DataTableProps extends AgGridReactProps {
  customClass?: string;
  tableProps: {
    data: DataRow[];
    columns: ColDef[] | null;
    pageSize?: number;
    loading: boolean;
    options?: {
      rowHeight?: number;
      withoutHeader?: boolean;
      withPagination?: boolean;
    };
  };
  onRowClick?: (rowData: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ tableProps: { data, columns, options }, customClass, ...rest }) => {
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
      <div className={classNames(classes.container, customClass, 'ag-theme-material')}>
        <AgGridReact
          columnDefs={columns}
          rowData={filteredData}
          paginationPageSize={20}
          className={classes.table}
          rowHeight={options?.rowHeight ?? 60}
          pagination={options?.withPagination}
          {...rest}
        />
      </div>
    </>
  );
};

DataTable.defaultProps = {
  tableProps: {
    data: [],
    columns: [],
    loading: false,
    options: {
      withoutHeader: false,
      withPagination: true
    }
  }
};

export default DataTable;
