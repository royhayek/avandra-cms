import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export default makeStyles((theme: Theme) => ({
  header: {
    gap: 2,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  }
}));
