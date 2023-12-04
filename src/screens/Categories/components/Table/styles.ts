// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Colors
import { light_colors } from 'shared/assets/theme/colors';

// Styles

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
    background: theme.palette.mode === 'light' ? '#f8f9fe' : '#252836'
  },
  statusLabel: {
    fontWeight: 'bold',
    color: light_colors.white
  }
}));

export default useStyles;
