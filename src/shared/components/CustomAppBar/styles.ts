// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

export const appBarHeight = 64;

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    position: 'sticky',
    zIndex: theme.zIndex.drawer + 1,
    height: `${appBarHeight}px !important`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    webkitBoxShadow: '0px 1px 15px -1px #D3D3D3 !important',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}));

export default useStyles;
