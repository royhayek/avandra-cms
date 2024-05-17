// Packages
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { Avatar, Box, Container, Typography } from '@mui/material';
import Button from 'shared/components/Buttons/Primary';

// Utilities
import useStyles from './styles';
import { useAppThunkDispatch } from 'app/store';
import { getTripAction } from 'redux/trips/thunks';

// Interfaces
import { TripProps } from 'shared/types/Trip';

interface RouteParams {
  path: string;
  id: string;
}

// Component
const DeepLinkRedirect = () => {
  // Redux
  const disptachThunk = useAppThunkDispatch();

  // Statics
  const classes = useStyles();
  const { path, id } = useParams() as RouteParams;

  const [trip, setTrip] = useState<TripProps>();
  const { payload: { name, image } = {} } = trip || {};

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Callbacks
  const fetchTrip = useCallback(async () => {
    const response = await disptachThunk(getTripAction(id));
    setTrip(response?.payload);
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
      <Typography className={classes.title} variant="h6">
        Open link in App?
      </Typography>

      <Avatar
        alt="image"
        variant="rounded"
        className={classes.tripImage}
        src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/trip/image/${image}`}
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
        <Button
          text="Open"
          className={classes.openButton}
          onClick={() => (window.location.href = `avandra://${path}/${id}`)}
        />
      ) : null}

      <Box className={classes.storeButtons}>
        <img
          alt="applestore"
          style={{ width: 150, marginTop: 20 }}
          src={require('../../shared//assets/images/appstore.png')}
        />
        <img
          alt="applestore"
          style={{ width: 150, marginTop: 20 }}
          src={require('../../shared//assets/images/playstore.png')}
        />
      </Box>
    </Container>
  );
};

export default DeepLinkRedirect;
