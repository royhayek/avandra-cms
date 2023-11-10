import { toast } from "react-toastify";
import { store } from "redux/store";
import { logout } from "helpers";
import axios from "axios";
import _ from "lodash";

const isDev = process.env.NODE_ENV.match(/development/) ? true : false;
const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  header: { "Content-Type": "application/json", Accept: "application/json" },
  maxRedirects: 0,
  withCredentials: false,
});

_axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getState()?.auth?.token}`;
  return config;
});

export const fetchPublic = (endpoint, payload, method = "get", headers = {}) => {
  try {
    // Handle payload as get url parameter (to be called exactly the same as post from callee)
    if (_.isEqual(method, "get") && !_.isNil(payload)) endpoint += `/${payload}`;

    console.info(`_axios :: url: ${endpoint}`);
    return _axios(endpoint, {
      method,
      headers,
      data: payload,
    })
      .then(response => {
        console.debug("[fetchApi] ::", response);
        // eslint-disable-next-line no-throw-literal
        // throw { redirect: true };
        return response;
      })
      .catch(e => {
        console.debug("e", e);
        if (e.response) {
          if (e.response.data) {
            toast.error(e.response.data.message);
            // eslint-disable-next-line no-throw-literal
            throw { status: e.status };
          }
        } else if (e.redirect) {
          // Navigating away to  '/' because response for fetch is Redirect
          window.location.replace("/");
        } else {
          throw e;
        }
      });
  } catch (err) {
    console.error("ERROR in [fetchPublic] :: ", err);
  }
};

export const fetchApi = (endpoint, payload, method = "get", headers = {}) => {
  try {
    // Should only allow calling API if user is authenticated
    const authenticated = store.getState()?.auth?.authenticated || isDev;
    if (!authenticated) return new Promise((resolve, reject) => reject("[fetchApi] :: Un-Authenticated"));

    // Handle payload as get url parameter (to be called exactly the same as post from callee)
    if (_.isEqual(method, "get") && !_.isNil(payload)) endpoint += `/${payload}`;

    console.info(`_axios :: url: ${endpoint}, payload:`, payload);
    return _axios(endpoint, {
      method,
      headers,
      data: payload,
    })
      .then(response => {
        console.debug("[fetchApi] ::", response);
        // eslint-disable-next-line no-throw-literal
        return response;
      })
      .catch(e => {
        if (e.response) {
          if (e.response.json) {
            e.response
              .json()
              .then(json => {
                if (json) throw json;
                throw e;
              })
              .catch(ex => {
                throw ex;
              });
          } else if (e.response.data?.status) {
            let { status = {} } = e.response.data;
            toast.error(status);
            // eslint-disable-next-line no-throw-literal
            throw { status };
          } else {
            throw e;
          }
        } else if (e.redirect) {
          // Just set authenicated to false, and App.js will handle the rest
          store?.getState()?.auth?.authenticated && logout();

          // eslint-disable-next-line no-throw-literal
          throw { redirect: true };
        }
      });
  } catch (err) {
    console.error("ERROR in [fetchApi] :: ", err);
  }
};
