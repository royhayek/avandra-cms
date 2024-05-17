// Packages
import _ from 'lodash';
import { ColDef, GridApi } from 'ag-grid-community';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import CustomPagination from './CustomPagination';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, Tab, Tabs, TextField, useTheme } from '@mui/material';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';

// Utilities
import useStyles from './styles';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getLanguages } from 'redux/services/config/slice';
import { TABLE_PAGE_SIZE } from 'shared/constants/variables';
import { getDataLanguage, uiActions } from 'redux/services/ui/slice';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// Component
import { PaginationProps } from 'shared/types/Pagination';

interface DataRow {
  [key: string]: string | number | undefined;
}

interface DataTableProps extends AgGridReactProps {
  customClass?: string;
  tableProps: {
    data: DataRow[];
    loading: boolean;
    pageSize?: number;
    columns: ColDef[] | null;
    onRefresh: (page: number) => void;
    options?: {
      rowHeight?: number;
      hasLanguages?: boolean;
      withoutHeader?: boolean;
      withPagination?: boolean;
      pagination: PaginationProps | null;
    };
  };
  onRowClick?: (rowData: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  tableProps: { data, columns, loading, onRefresh, options },
  customClass,
  ...rest
}) => {
  // Redux
  const dispatch = useAppDispatch();

  const languages = useAppSelector(getLanguages);
  const dataLang = useAppSelector(getDataLanguage);

  // Statics
  const classes = useStyles();
  const theme = useTheme();

  const [searchText, setSearchText] = useState<string>('');
  const [gridApi, setGridApi] = useState<GridApi>();

  // Callbacks
  const onLanguageChange = useCallback(
    (__, lang: string) => {
      dispatch(uiActions.update({ dataLang: lang }));
    },
    [dispatch]
  );

  const onSearchTextChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const handlePageChange = useCallback((page) => onRefresh(parseInt(page)), [onRefresh]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  // Effects
  useEffect(() => {
    if (loading) {
      gridApi?.showLoadingOverlay();
    } else {
      gridApi?.hideOverlay();
    }
  }, [gridApi, loading]);

  // Renderers Vars
  const headerTabs = useMemo(
    () =>
      languages
        ? [
            {
              _id: 'all',
              value: 'all',
              label: 'All',
              rtl: false
            },
            ...languages
          ]
        : [],
    [languages]
  );

  const filteredData = useMemo(() => {
    if (searchText) {
      return data?.filter((row) => {
        return Object.values(row).some((value) => value?.toString().toLowerCase().includes(searchText.toLowerCase()));
      });
    }

    const sortedData = _.orderBy(data, '_id', 'desc');

    return !options?.hasLanguages || _.isEqual(dataLang, 'all')
      ? sortedData
      : _.filter(sortedData, (d) => _.isEqual(d.language?._id, _.find(languages, { value: dataLang })?._id));
  }, [data, dataLang, languages, options?.hasLanguages, searchText]);

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
      <div
        className={classNames(
          classes.container,
          customClass,
          theme.palette.mode === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'
        )}>
        {options?.hasLanguages && (
          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
            <Tabs value={dataLang} onChange={onLanguageChange} aria-label="language tabs">
              {_.map(headerTabs, (lang) => (
                <Tab key={lang?._id} value={lang?.value} label={lang?.label} />
              ))}
            </Tabs>
          </Box>
        )}

        <AgGridReact
          columnDefs={columns}
          rowData={filteredData}
          onGridReady={onGridReady}
          paginationPageSize={TABLE_PAGE_SIZE}
          className={classes.table}
          suppressPaginationPanel={true}
          suppressLoadingOverlay={!loading}
          rowHeight={options?.rowHeight ?? 60}
          pagination={options?.withPagination ?? true}
          {...rest}
        />

        <CustomPagination
          pageSize={TABLE_PAGE_SIZE}
          onPageChange={handlePageChange}
          className={classes.paginationBar}
          currentPage={options?.pagination?.page ?? 1}
          totalCount={options?.pagination?.count ?? 0}
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
    onRefresh: () => null,
    options: {
      hasLanguages: false,
      withoutHeader: false,
      withPagination: true,
      pagination: null
    }
  }
};

export default DataTable;
