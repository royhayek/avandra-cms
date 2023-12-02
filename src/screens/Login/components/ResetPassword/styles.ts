import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
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
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      height: '35%'
    },
    [theme.breakpoints.only('md')]: {
      width: '40%',
      height: '30%',
      padding: 24
    }
  }
}));

export default useStyles;
