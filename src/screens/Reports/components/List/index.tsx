// Packages
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import React, { useMemo, useCallback } from 'react';

// Components
import Card from 'shared/components/Card';
import { Box, Grid, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { reportsList } from './config';

// Component

const List = () => {
  // Statics
  const classes = useStyles();
  const history = useHistory();

  // Callbacks
  const handleItemClick = useCallback((key) => history.push(`/reports/${key}`), [history]);

  // Renderers
  const renderItem = useCallback(
    ({ key, label, description }) => (
      <Grid item xs={12} sm={12} md={4} key={key} onClick={() => handleItemClick(key)}>
        <Box className={classes.itemContainer}>
          <Typography variant="body1">{label}</Typography>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Grid>
    ),
    [classes.itemContainer, handleItemClick]
  );

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Reports</Typography>
      </Box>

      <Card>
        <Grid container spacing={3}>
          {_.map(reportsList, renderItem)}
        </Grid>
      </Card>
    </>
  );
};

export default List;
