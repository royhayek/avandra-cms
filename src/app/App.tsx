// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import React from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Router from './router';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getUI } from '../redux/services/ui/slice';
import { getCustomTheme } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import './api';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const App = () => {
  const { lang, theme: themeType } = useSelector(getUI);
  const theme = getCustomTheme(lang, themeType);

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
          hideProgressBar
          theme={themeType}
          closeButton={false}
          closeOnClick={false}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
