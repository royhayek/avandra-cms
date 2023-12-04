// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  card: {
    padding: 32,
    width: '40%',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      padding: 24
    }
  },
  forgotPassBtn: {
    textTransform: 'capitalize'
  },
  modal: {
    top: '50%',
    left: '50%',
    padding: 24,
    width: '30%',
    height: '40%',
    borderRadius: 8,
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      padding: 24
    }
  }
}));

export default useStyles;
