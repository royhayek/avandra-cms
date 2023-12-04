// Theme
import { makeStyles, Theme } from '@mui/styles';

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
  }
}));
