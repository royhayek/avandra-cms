// Theme
import { makeStyles, Theme } from '@mui/styles';

// Styles

export const appBarHeight = 64;

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '100%',
    minHeight: 85,
    borderRadius: 8,
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2)
    }
  }
}));

export default useStyles;
