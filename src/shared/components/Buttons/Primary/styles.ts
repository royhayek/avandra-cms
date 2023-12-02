import { light_colors } from 'shared/assets/theme/colors';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export default makeStyles((theme: Theme) => ({
  button: {
    minWidth: 90,
    minHeight: 40,
    fontWeight: 600,
    borderRadius: 50,
    textTransform: 'none',
    color: light_colors.white,
    '&.outlined': {
      color: theme.palette.primary.main
    }
  }
}));
