// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  page: {
    margin: 16,
    width: '100%'
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  mainBox: {
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2)
    }
  }
}));

export default useStyles;
