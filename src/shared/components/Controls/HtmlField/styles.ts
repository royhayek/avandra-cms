// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    margin: '10px 0',
    cursor: 'pointer',
    padding: '8px 12px 12px 12px',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.colors.background,
    '&.error': {
      border: '1px dashed red'
    },
    [theme.breakpoints.down('md')]: {
      height: 60
    }
  }
}));

export default useStyles;
