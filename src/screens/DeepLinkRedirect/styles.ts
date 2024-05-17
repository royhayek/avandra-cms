// Theme
import { makeStyles } from '@mui/styles';

// Styles

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    boxSizing: 'border-box'
  },
  title: {
    marginBottom: '20px',
    color: 'black'
  },
  text: {
    marginBottom: '40px',
    textAlign: 'center',
    color: 'black'
  }
}));

export default useStyles;
