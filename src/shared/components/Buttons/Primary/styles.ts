// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Colors
import { light_colors } from 'shared/assets/theme/colors';

// Styles

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
  },
  containedSecondary: {
    color: theme.palette.mode === 'dark' ? theme.colors.white : theme.colors.primary,
    background: theme.palette.mode === 'dark' ? theme.colors.dark[5] : theme.colors.greenBg,
    '&:hover': {
      background: light_colors.secondary
    }
  }
}));
