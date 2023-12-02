import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'app/store';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';
import App from 'app/App';

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
