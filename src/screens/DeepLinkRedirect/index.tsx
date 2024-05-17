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
import { getDestinationAction } from 'redux/destinations/thunks';
import { APP_STORE_URL, GOOGLE_PLAY_STORE_URL } from 'shared/constants/variables';

// Interfaces
import { TripProps } from 'shared/types/Trip';
import { getArticleAction } from 'redux/articles/thunks';

interface RouteParams {
  id: string;
  path: string;
}

interface DataProps {
  name: string;
  image: string;
  imagePath: string;
  payload?: TripProps;
}

// Component
const DeepLinkRedirect = () => {
  // Redux
  const disptachThunk = useAppThunkDispatch();

  // Statics
  const classes = useStyles();
  const { path, id } = useParams() as RouteParams;

  const [data, setData] = useState<DataProps>();
  const [loading, setLoading] = useState<boolean>();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Callbacks
  const formatData = useCallback(() => {
    switch (path) {
      case 'trip':
        return { image: data?.image, name: data?.payload?.name, imagePath: data?.imagePath };

      case 'destination':
        return { name: data?.name, image: data?.image };

      case 'article':
        return { name: data?.name, image: data?.image };

      default:
        break;
    }
  }, [data, path]);

  const { name, image, imagePath } = formatData();

  const fetchTrip = useCallback(async () => {
    setLoading(true);
    const response = await disptachThunk(getTripAction(id));
    setData(response?.payload);
    setLoading(false);
  }, [disptachThunk, id]);

  const fetchDestination = useCallback(async () => {
    setLoading(true);
    const response = await disptachThunk(getDestinationAction(id));
    setData(response?.payload);
    setLoading(false);
  }, [disptachThunk, id]);

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    const response = await disptachThunk(getArticleAction(id));
    setData(response?.payload);
    setLoading(false);
  }, [disptachThunk, id]);

  const fetchData = useCallback(() => {
    switch (path) {
      case 'trip':
        fetchTrip();
        break;

      case 'destination':
        fetchDestination();
        break;

      case 'article':
        fetchArticle();
        break;

      default:
        break;
    }
  }, [fetchDestination, fetchArticle, fetchTrip, path]);

  const getTripDisplayInfo = () => {
    switch (path) {
      case 'trip':
        return {
          title: `Join my planned trip to ${name}!`,
          description: `Check out this ${path} on Avandra, the ultimate app for AI trip creation.`
        };

      case 'destination':
        return {
          title: `Generate a trip to ${name}!`,
          description: `Check out this ${path} on Avandra, the ultimate app for AI trip creation.`
        };

      case 'article':
        return {
          title: `Read this article "${name}"!`,
          description: `Check out this ${path} on Avandra, the ultimate app for AI trip creation.`
        };

      default:
        return { title: '', description: '' };
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Redirect to the app on mobile devices
      window.location.href = `avandra://share/${path}/${id}`;
    }
  }, [id, isMobile, path]);

  // Renderers Vars
  const { title, description } = getTripDisplayInfo();

  // console.debug('[DeepLinkRedirect] trip:', { trip: data, imagePath, image, title, description, path, id });

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
              onClick={() => (window.location.href = `avandra://share/${path}/${id}`)}
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
