// Packages
import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

// Component

const Button = () => {
  // Statics
  const history = useHistory();

  // Renderers
  return (
    <IconButton onClick={() => history.goBack()}>
      <ArrowBack />
    </IconButton>
  );
};

export default Button;
