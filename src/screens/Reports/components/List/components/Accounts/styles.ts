// Theme
import { makeStyles, Theme } from '@mui/styles';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4)
  }
}));

export default useStyles;
