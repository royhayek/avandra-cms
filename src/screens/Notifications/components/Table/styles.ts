import { light_colors } from 'shared/assets/theme/colors';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4)
  },
  rowActionBtns: {
    gap: 4,
    display: 'flex'
  },
  actionBtn: {
    background: theme.palette.mode === 'light' ? '#f8f9fe' : '#252836'
  },
  statusLabel: {
    color: light_colors.white,
    fontWeight: 'bold'
  }
}));

export default useStyles;
