// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 16,
    display: 'flex'
  },
  paginationItem: {
    padding: '0 12px',
    height: '32px',
    textAlign: 'center',
    margin: 'auto 4px',
    color: theme.colors.white,
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    letterSpacing: '0.01071em',
    borderRadius: '16px',
    lineHeight: '1.43',
    fontSize: '13px',
    minWidth: '32px',
    '&.dots:hover': {
      backgroundColor: 'transparent',
      cursor: 'default'
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer'
    },
    '&.selected': {
      backgroundColor: theme.colors.background
    }
  }
}));

export default useStyles;
