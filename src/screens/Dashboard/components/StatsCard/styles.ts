import { light_colors } from 'shared/assets/theme/colors';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'space-between'
  },
  iconContainer: {
    padding: 10,
    lineHeight: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: light_colors.white,
    backgroundColor: theme.palette.primary.main
  }
}));

export default useStyles;
