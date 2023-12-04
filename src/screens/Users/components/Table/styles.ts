// Theme
import { makeStyles, Theme } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-between',
  },
  rowActionBtns: {
    gap: 4,
    display: 'flex'
  },
  actionBtn: {
    background: theme.palette.mode === 'light' ? '#f8f9fe' : '#252836'
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: 'bold'
  }
}));

export default useStyles;
