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
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px 16px',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.colors.dark[5] : theme.colors.gray[200]}`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.colors.dark[3] : theme.colors.gray[50]
  }
}));
