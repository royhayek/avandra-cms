import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 0,
    border: 'none'
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
