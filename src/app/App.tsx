// Packages
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React, { useCallback, useEffect } from 'react';

// Components
import Router from './router';
import { CssBaseline, ThemeProvider } from '@mui/material';

// Utilities
import './api';
import { getCustomTheme } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import { getUI } from '../redux/services/ui/slice';
import { useAppSelector, useAppThunkDispatch } from './store';
import { getConfigAction } from 'redux/services/config/thunks';
import { getUserAuthenticated } from 'redux/services/auth/slice';

// Component

const App = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const { lang, theme: themeType } = useAppSelector(getUI);
  const isAuthenticated = useAppSelector(getUserAuthenticated);

  // Statics
  const theme = getCustomTheme(lang, themeType);

  // Callbacks
  const initConfig = useCallback(() => {
    dispatch(getConfigAction());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    isAuthenticated && initConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Renderers
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
        bodyStyle={{ fontFamily: theme.typography.fontFamily }}
      />
    </ThemeProvider>
  );
};

export default App;
