import React from "react";
// import _ from "lodash";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  userId,
  path,
  routes,
  component: Component,
  ...rest
}) => {
  //   const hasCookie = !_.isEmpty(getCookie("uid"));
  const hasCookie = false;

  return (
    <Route
      path={path}
      render={(props) =>
        hasCookie ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            routes={routes}
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
