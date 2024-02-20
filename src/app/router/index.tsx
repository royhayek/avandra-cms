// Packages
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// Components
import NoMatch from './NoMatch';
import SubRouter from './SubRouter';
import { Box } from '@mui/material';
import MainLayout from '../../shared/components/MainLayout';

// Utilities
import config from './Config';
import { useAppSelector } from 'app/store';
import { getUserRole } from 'redux/user/slice';
import { getUserAuthenticated } from 'redux/services/auth/slice';

// Component

const Router = () => {
  // Redux
  const role = useAppSelector(getUserRole);
  const authenticated = useSelector(getUserAuthenticated);

  // Renderers
  const renderRoute = useMemo(() => {
    console.debug('role', role);

    try {
      // TODO: replace "admin" with the dynamic role
      const _routes = config[role ?? 'anonymous'].routes;

      const _router = (
        <Switch>
          {_routes.map((route, i) => (
            <SubRouter key={i} {...route} force={false} />
          ))}
          <Route component={NoMatch} />
        </Switch>
      );

      return _router;
    } catch (err) {
      console.log('Error in [Router - renderRoute] :: ', err);

      return null;
    }
  }, [role]);

  return (
    <>
      {/* Header */}

      {authenticated ? (
        <MainLayout>
          <Box component="section" style={{ flex: 1 }}>
            {renderRoute}
          </Box>
        </MainLayout>
      ) : (
        <Box component="section" style={{ flex: 1 }}>
          {renderRoute}
        </Box>
      )}

      {/* Footer */}
    </>
  );
};

export default Router;
