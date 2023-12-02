import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1
  },
  page: {
    margin: 16,
    width: '100%'
  },
  toolbar: {
    ...theme.mixins.toolbar
  }
}));

export default useStyles;
