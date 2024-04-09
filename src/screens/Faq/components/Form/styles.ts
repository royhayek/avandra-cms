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
  previewAccordion: {
    width: '50%',
    borderRadius: 8,
    backgroundColor: theme.palette.mode === 'dark' ? theme.colors.dark[3] : 'transparent',
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.colors.dark[5] : theme.colors.gray[200]}`,
    '&.rtl': {
      direction: 'rtl'
    }
  },
  previewHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(3),
    justifyContent: 'space-between'
  },
  previewBody: {
    padding: theme.spacing(3)
  }
}));
