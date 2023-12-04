// Packages
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import React from 'react';

// Components
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Router from './router';

// Utilities
import { getUI } from '../redux/services/ui/slice';
import 'react-toastify/dist/ReactToastify.css';
import { getCustomTheme } from './theme';
import './api';

// Component

const App = () => {
  // Redux
  const { lang, theme: themeType } = useSelector(getUI);

  // Statics
  const theme = getCustomTheme(lang, themeType);

  // Renderers
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={{ display: 'flex', flex: 1, width: '100%' }}>
        <BrowserRouter basename="">
          <Router />
        </BrowserRouter>

        <ToastContainer
          draggable
          newestOnTop
          closeOnClick
          hideProgressBar
          autoClose={2000}
          theme={themeType}
          closeButton={false}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
