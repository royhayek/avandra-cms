// Packages
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { Container, Typography } from '@mui/material';
import Button from 'shared/components/Buttons/Primary';

// Utilities
import useStyles from './styles';

// Interfaces
interface RouteParams {
  path: string;
  id: string;
}

// Component
const DeepLinkRedirect = () => {
  // Statics
  const classes = useStyles();
  const { path, id } = useParams() as RouteParams;

  // Effects
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Redirect to the app on mobile devices
      window.location.href = `wondrous://${path}/${id}`;
    } else {
      // Show a message or button for desktop users
      alert('Please open this link on your mobile device to be redirected to the app.');
    }
  }, [id, path]);

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h6">
        Redirecting to the App
      </Typography>
      <Typography className={classes.text} variant="body1">
        If you are not redirected, click the button below:
      </Typography>
      <Button onClick={() => (window.location.href = `wondrous://${path}/${id}`)} text="Open the APP" />
    </Container>
  );
};

export default DeepLinkRedirect;
