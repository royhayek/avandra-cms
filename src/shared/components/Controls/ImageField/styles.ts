// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: 100,
    display: 'flex',
    borderRadius: 4,
    margin: '10px 0',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed ActiveBorder',
    '&.error': {
      border: '1px dashed red'
    },
    [theme.breakpoints.down('md')]: {
      height: 60
    }
  },
  label: {
    top: 0,
    left: 10,
    padding: '0 5px',
    fontWeight: 600,
    position: 'absolute',
    background: theme.palette.background.paper
  },
  imageContainer: {
    flex: 1,
    height: 60,
    padding: 8,
    display: 'flex',
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.background.default
  },
  previewImage: {
    width: 50,
    height: 50,
    cursor: 'pointer'
  },
  smallPreviewImage: {
    width: 25,
    height: 20,
    cursor: 'pointer'
  },
  fileInput: {
    display: 'none'
  }
}));

export default useStyles;
