import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Route, RouteComponentProps, RouteProps as RRDRouteProps } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

interface SubRouterProps extends RRDRouteProps {
  isPublic?: boolean;
  autoLogin?: boolean;
  component: React.ComponentType<RouteComponentProps<ReactNode>> | React.ComponentType<ReactNode> | undefined;
  force?: boolean;
}

const SubRouter: FC<SubRouterProps> = ({ path, isPublic = true, component: Component, ...rest }) => {
  return isPublic ? (
    <Route path={path} render={(props) => (Component ? <Component {...props} /> : <Box>Force update screen</Box>)} />
  ) : (
    <ProtectedRoute path={path} component={Component} {...rest} />
  );
};

export default SubRouter;
