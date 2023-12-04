// Theme
import { makeStyles, Theme } from '@mui/styles';

// Utilities
import { appBarHeight } from '../CustomAppBar/styles';
import { light_colors } from 'shares/assets/theme/colors';

// Styles
const drawerWidth = 256;

export default makeStyles((theme: Theme) => ({
  drawer: {
    overflowX: 'hidden',
    borderRight: 'none',
    marginTop: `${appBarHeight}px`,
    background: theme.palette.background.default,
    width: `calc(${theme.spacing(7)} + 1px)`,
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
      color: light_colors.white,
      background: theme.palette.primary.main
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
