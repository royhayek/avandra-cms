import { authActions } from "redux/services/auth/slice";
import { fetchPublic } from "redux/services/api";
import { toast } from "react-toastify";
import { store } from "redux/store";

const endpoints = {
  login: "/login",
  logout: "/logout",
};

export const login = payload => {
  return fetchPublic(endpoints.login, payload, "post")
    .then(({ data }) => {
      console.debug("[login] :: ", { data });
      const {
        data: { user, token },
      } = data;
      store.dispatch(
        authActions.update({
          user,
          token,
          role: "admin",
          authenticated: true,
        }),
      );
    })
    .catch(err => toast.error(err));
};

export const logout = payload => fetchPublic(endpoints.logout, payload);
