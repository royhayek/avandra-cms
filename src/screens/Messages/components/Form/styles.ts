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
  },
  previewButton: {
    borderRadius: 30,
    padding: '6px 14px',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.colors.dark[5] : theme.colors.gray[300]}`
  }
}));
