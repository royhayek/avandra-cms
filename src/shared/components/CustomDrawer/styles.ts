// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Utilities
import { appBarHeight } from '../CustomAppBar/styles';

// Styles
const drawerWidth = 256;

export default makeStyles((theme: Theme) => ({
  drawer: {
    overflowX: 'hidden',
    borderRight: 'none',
    overflowY: 'auto',
    background: theme.palette.mode === 'dark' ? theme.colors.background : 'transparent',
    marginTop: `${appBarHeight}px`,
    width: `calc(${theme.spacing(8)} + 1px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(${theme.spacing(10)} + 1px)`
    },
    '&.open': {
      width: drawerWidth,
      overflowX: 'hidden',
      overflowY: 'auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  listItemButton: {
    minHeight: 50,
    borderRadius: '8px',
    margin: '10px 16px',
    justifyContent: 'center',
    '&.open': {
      justifyContent: 'initial'
    },
    '&.Mui-selected': {
      color: theme.colors.white,
      background: theme.palette.primary.main
    },
    '&.child': {
      marginInlineStart: 24,
      minHeight: 40
    }
  },
  listItemIcon: {
    minWidth: 0,
    color: 'inherit',
    marginRight: 'auto',
    justifyContent: 'center',
    '&.open': {
      marginRight: 16
    }
  },
  listItemText: {
    opacity: 0,
    '&.open': {
      opacity: 1
    }
  }
}));
