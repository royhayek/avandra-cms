// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  // AG Grid //
  container: {
    height: 500,
    display: 'flex',
    flexDirection: 'column'
  },
  table: {
    '& .ag-root-wrapper': {
      borderRadius: 8,
      border: `1px solid ${theme.colors.divider}`,
      backgroundColor: 'transparent'
    },
    '& .ag-header': {
      color: theme.colors.secondary,
      borderColor: theme.colors.divider,
      backgroundColor: theme.colors.background
    },
    '& .ag-header-cell-text': {
      color: theme.colors.secondary
    },
    '& .ag-row': {
      backgroundColor: 'transparent',
      color: theme.colors.textPrimary,
      borderColor: theme.colors.divider
    },
    '& .ag-row-odd': {
      backgroundColor: theme.colors.lightGray
    },
    '& .ag-cell': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .ag-paging-panel': {
      borderColor: theme.colors.divider,
      color: theme.colors.textPrimary
    },
    '& .ag-icon': {
      color: theme.colors.secondary
    },
    '& .ag-picker-field-wrapper': {
      backgroundColor: theme.colors.background
    }
  },
  searchField: {
    width: 300,
    marginBottom: 24
  },
  // X Data Grid //
  root: {
    border: 'none',
    borderRadius: 0
  },
  columnHeader: {
    padding: '0px 16px !important'
  },
  columnHeaders: {
    borderBottom: '0 !important'
  },
  columnHeaderTitle: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    textTransform: 'none'
  },
  columnSeparator: {
    display: 'none !important'
  },
  cell: {
    borderBottom: '0 !important',
    padding: '0px 16px !important',
    '&:focus': {
      outline: 'none !important'
    },
    '&:focus-within': {
      outline: 'none !important'
    }
  },
  toolbarContainer: {
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between'
  },
  row: {
    background: theme.palette.background.default,
    borderTop: '1px solid #8898aa30'
  },
  footerContainer: {
    borderTop: '1px solid #8898aa30'
  },
  filterForm: {
    [theme.breakpoints.down('md')]: {
      display: 'grid'
    }
  },
  filterFormColumnInput: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  filterFormOperatorInput: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(1)
    }
  },
  filterFormValueInput: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(1)
    }
  }
}));

export default useStyles;
