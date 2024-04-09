// Theme
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-between'
  },
  rowActionBtns: {
    gap: 4,
    display: 'flex'
  },
  actionBtn: {
    background: theme.palette.mode === 'light' ? '#f8f9fe' : '#252836',
    '&.isSelected': {
      color: theme.colors.white,
      background: theme.colors.primary
    }
  }
}));

export default useStyles;
