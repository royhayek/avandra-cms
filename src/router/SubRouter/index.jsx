import React from "react";
import { Box } from "@mui/material";
import { Route } from "react-router-dom";
import ProtectedRoute from "router/ProtectedRoute";

const SubRouter = ({ path, routes, isPublic = true, autoLogin, component: Component, force, ...rest }) => {
  return isPublic ? (
    <Route
      path={path}
      render={props => (force ? <Box>Force update screen</Box> : <Component {...props} routes={routes} />)}
    />
  ) : (
    <ProtectedRoute path={path} routes={routes} autoLogin={autoLogin} component={Component} {...rest} />
  );
};

export default SubRouter;
