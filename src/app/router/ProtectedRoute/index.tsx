// Packages
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const ProtectedRoute = ({ path, ...rest }: RouteProps) => (
  <Route
    path={path}
    render={(props) => <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    {...rest}
  />
);

export default ProtectedRoute;
