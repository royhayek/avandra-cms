// Theme
import { makeStyles } from '@mui/styles';

// Styles

const useStyles = makeStyles(() => ({
  root: {
    padding: 24,
    display: 'flex',
    height: '100vh',
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  title: {
    color: 'black',
    marginBottom: 20,
    textAlign: 'center'
  },
  text: {
    color: 'black',
    marginBottom: 40,
    textAlign: 'center'
  },
  tripImage: {
    width: 115,
    height: 90,
    alignSelf: 'center'
  },
  tripTitle: {
    marginTop: 24
  },
  tripDescription: {
    marginTop: 8,
    fontWeight: 500
  },
  redirectText: {
    marginTop: 40,
    marginBottom: 16,
    fontWeight: 600,
    textAlign: 'center'
  },
  openButton: {
    alignSelf: 'center',
    paddingInline: 40
  },
  storeButtons: {
    gap: 16,
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default useStyles;
