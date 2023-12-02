// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import MainLayout from '../../shared/components/MainLayout';
import { Box } from '@mui/material';
import SubRouter from './SubRouter';
import NoMatch from './NoMatch';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getUserAuthenticated } from 'redux/services/auth/slice';
import { getUserRole } from 'redux/user/slice';
import { useAppSelector } from 'app/store';
import config from './Config';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Router = () => {
  //----------------------------------------------------//
  //---------------------- REDUX -----------------------//
  const role = useAppSelector(getUserRole);
  const authenticated = useSelector(getUserAuthenticated);
  //--------------------- /REDUX -----------------------//
  //----------------------------------------------------//

  //----------------------------------------------------//
  //------------------- RENDERERS ----------------------//
  const renderRoute = useMemo(() => {
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
  //------------------- /RENDERERS ---------------------//
  //----------------------------------------------------//

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
