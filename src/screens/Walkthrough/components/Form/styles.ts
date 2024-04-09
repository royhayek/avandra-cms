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
  previewContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  relativeContainer: {
    height: 480,
    position: 'relative'
  },
  previewImage: {
    width: 250,
    height: 385,
    paddingTop: 20,
    objectFit: 'contain',
    backgroundColor: theme.colors.primary
  },
  bottomContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    position: 'absolute',
    background: theme.palette.mode === 'dark' ? theme.colors.dark[1] : theme.colors.white
  },
  previewTitle: {
    lineHeight: 1.2,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  previewDescription: {
    marginTop: 10,
    fontSize: '0.6rem',
    textAlign: 'center',
    fontWeight: 'normal'
  },
  previewIndicator: {
    gap: 4,
    marginTop: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  activeDot: {
    width: 22,
    height: 6,
    borderRadius: 50,
    backgroundColor: theme.colors.primary
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: theme.colors.secondary
  },
  divider: {
    margin: '12px 0'
  },
  buttonsContainer: {
    gap: 8,
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  skipButton: {
    flex: 1,
    height: 35,
    fontSize: 12,
    minHeight: 35
  },
  continueButton: {
    flex: 1,
    height: 35,
    fontSize: 12,
    minHeight: 35
  }
}));
