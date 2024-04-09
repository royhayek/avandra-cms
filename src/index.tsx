// Packages
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Components
import App from 'app/App';

// Utilities
import { persistor, store } from 'app/store';
import { StyledEngineProvider } from '@mui/material';

// Main Render
render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StyledEngineProvider>,
  document.getElementById('root')
);
