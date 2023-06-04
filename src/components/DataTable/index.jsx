// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo } from "react";
import PT from "prop-types";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";
import CustomPagination from "./CustomPagination";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useIsSmall } from "helpers";
import useStyles from "./styles.js";
import _ from "lodash";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const DataTable = ({
  data,
  columns,
  options: { withoutHeader },
  ...tableProps
}) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const classes = useStyles();
  const isSmall = useIsSmall();
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //------------------- RENDER VARS --------------------//
  const finalColumns = useMemo(
    () => _.map(columns, (c) => ({ ...c, flex: isSmall ? 0 : c.flex })),
    [columns, isSmall]
  );
  //------------------ /RENDER VARS --------------------//
  //----------------------------------------------------//

  return (
    <DataGrid
      autoHeight
      rows={data}
      pageSize={5}
      columns={finalColumns}
      headerHeight={40}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      localeText={{
        toolbarExport: "",
        toolbarColumns: "",
        toolbarFilters: "",
      }}
      rowHeight={60}
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
        filterFormOperatorInput: classes.filterFormOperatorInput,
      }}
      components={{
        Toolbar: withoutHeader ? null : CustomToolbar,
        Pagination: CustomPagination,
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      {...tableProps}
    />
  );
};

DataTable.propTypes = {
  data: PT.array.isRequired,
  columns: PT.array.isRequired,
  options: PT.object,
};

DataTable.defaultProps = {
  data: [],
  columns: [],
  options: {
    withoutHeader: false,
  },
};

export default DataTable;
