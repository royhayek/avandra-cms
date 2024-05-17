// Theme
import { makeStyles } from '@mui/styles';

// Styles

const useStyles = makeStyles(() => ({
  root: {
    padding: 24,
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
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
    borderRadius: 6
  },
  tripTitle: {
    marginTop: 24,
    color: 'black'
  },
  tripDescription: {
    marginTop: 8,
    fontWeight: 500,
    textAlign: 'center'
  },
  redirectText: {
    marginTop: 40,
    color: 'black',
    fontWeight: 600,
    marginBottom: 16,
    textAlign: 'center'
  },
  openButton: {
    paddingInline: 40
  },
  storeButtons: {
    gap: 16,
    marginTop: 28,
    display: 'flex',
    justifyContent: 'center'
  },
  storeButton: {
    width: 160
  }
}));

export default useStyles;
