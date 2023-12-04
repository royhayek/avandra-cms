// Theme
import { makeStyles, Theme } from '@mui/styles';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    gap: 2,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  }
}));

export default useStyles;
