import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-between'
  }
}));

export default useStyles;
