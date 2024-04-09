// Packages
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { stringify } from 'qs';
import 'moment-timezone';

// Utilities
import { store } from './store';
import { logout } from 'shared/utils';
// import { logout } from 'shared/utils';

// import {ROUTES} from 'shared/constants/routes';

// import i18n from "./i18n";

axios.interceptors.request.use((req) => {
  // Set common config
  req.baseURL = process.env.REACT_APP_BACKEND_URL;
  req.headers.Accept = 'application/json';
  req.headers['timeZone'] = moment.tz.guess();

  req.paramsSerializer = {
    serialize: (params) => stringify(params, { skipNulls: true, allowDots: true })
  };

  // Set auth token if applicable
  const storeState = store.getState();
  const authenticated = storeState?.auth.authenticated;
  const accessToken = storeState?.auth.token;
  req.headers['x-auth-token'] = authenticated ? accessToken : process.env.REACT_APP_TOKEN;

  // Set language
  //   req.headers.language = i18n.language || process.env.REACT_APP_DEFAULT_LANGUAGE;

  return req;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.debug('API ERROR ::: ', error);

    if (error.response && _.isEqual(error.response.status, 500) && error.response.data.jwtExpired) {
      logout('Session expired, forced logout');
    }

    if (error.response && [401, 403].includes(error.response.status)) {
      const storeState = store.getState();
      const authenticated = storeState?.auth.authenticated;

      if (authenticated) {
        logout('User unauthenticated, forced logout');
      }

      throw error;
    }

    throw error;
  }
);
