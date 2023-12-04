// Theme
import { makeStyles, Theme } from '@mui/styles';

// Styles
export const appBarHeight = 64;

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
    height: `${appBarHeight}px !important`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    webkitBoxShadow: '0px 1px 15px -1px #D3D3D3 !important',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  dropdownContainer: {
    padding: 8,
    minWidth: 220,
    display: 'flex',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #8898aa30'
  },
  nameAndRole: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column'
  },
  role: {
    color: theme.palette.grey[600]
  },
  icon: {
    color: theme.palette.grey[600]
  }
}));

export default useStyles;
