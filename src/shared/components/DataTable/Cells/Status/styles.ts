// Theme
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  statusLabel: {
    fontWeight: 'bold',
    color: theme.colors.white
  }
}));

export default useStyles;
