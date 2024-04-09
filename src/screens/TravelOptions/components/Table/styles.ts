// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-between'
  },
  tableContainer: {
    height: 400
  },
  rowActionBtns: {
    gap: 4,
    display: 'flex'
  },
  actionBtn: {
    background: theme.palette.mode === 'light' ? '#f8f9fe' : '#252836'
  }
}));

export default useStyles;
