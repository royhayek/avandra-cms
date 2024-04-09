// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

export default makeStyles((theme: Theme) => ({
  header: {
    gap: 2,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  previewImage: {
    width: 220,
    height: 150,
    borderRadius: 8
  },
  previewFlag: {
    width: 20,
    height: 15,
    marginRight: 8
  }
}));
