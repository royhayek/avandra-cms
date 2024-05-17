// Packages
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

// Components
import RegularButton from 'shared/components/Buttons/Primary';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useAppThunkDispatch } from 'app/store';
import { getTripAction } from 'redux/trips/thunks';
import { APP_STORE_URL, GOOGLE_PLAY_STORE_URL } from 'shared/constants/variables';

// Interfaces
import { TripProps } from 'shared/types/Trip';

interface RouteParams {
  id: string;
  path: string;
}

// Component
const DeepLinkRedirect = () => {
  // Redux
  const disptachThunk = useAppThunkDispatch();

  // Statics
  const classes = useStyles();
  const { path, id } = useParams() as RouteParams;

  const [loading, setLoading] = useState<boolean>();
  const [trip, setTrip] = useState<TripProps>();
  const { payload, image, imagePath } = trip || {};
  const { name } = payload || {};

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Callbacks
  const fetchTrip = useCallback(async () => {
    setLoading(true);
    const response = await disptachThunk(getTripAction(id));
    setTrip(response?.payload);
    setLoading(false);
  }, [disptachThunk, id]);

  const getTripDisplayInfo = () => {
    switch (path) {
      case 'trip':
        return {
          title: `Join my planned trip to ${name}!`,
          description: `Check out this ${path} on Avandra, the ultimate app for AI trip creation.`
        };

      default:
        return { title: '', description: '' };
    }
  };

  // Effects
  useEffect(() => {
    fetchTrip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Redirect to the app on mobile devices
      window.location.href = `avandra://${path}/${id}`;
    }
  }, [id, isMobile, path]);

  // Renderers Vars
  const { title, description } = getTripDisplayInfo();

  return (
    <Container className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography className={classes.title} variant="h6">
            Open link in App?
          </Typography>

          <img
            alt="image"
            className={classes.tripImage}
            src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${imagePath ?? path}/image/${image}`}
          />

          <Typography className={classes.tripTitle} color="textPrimary" variant="body1">
            {title}
          </Typography>

          <Typography className={classes.tripDescription} color="secondary" variant="body1">
            {description}
          </Typography>

          <Typography className={classes.redirectText} variant="body2">
            {isMobile
              ? 'If you are not redirected, click the button below:'
              : 'Please open this link on your mobile device to be redirected to the app.'}
          </Typography>

          {isMobile ? (
            <RegularButton
              text="Open"
              className={classes.openButton}
              onClick={() => (window.location.href = `avandra://${path}/${id}`)}
            />
          ) : null}

          <Box className={classes.storeButtons}>
            <Button onClick={() => window.open(APP_STORE_URL)}>
              <img
                alt="applestore"
                className={classes.storeButton}
                src={require('../../shared//assets/images/appstore.png')}
              />
            </Button>

            <Button onClick={() => window.open(GOOGLE_PLAY_STORE_URL)}>
              <img
                alt="applestore"
                className={classes.storeButton}
                src={require('../../shared//assets/images/playstore.png')}
              />
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default DeepLinkRedirect;
