// Packages
import React, { ReactNode } from 'react';

// Components
import { Box } from '@mui/material';
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';

// Utilities
import useStyles from './styles';

// Component
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Statics
  const classes = useStyles();

  // Renderers
  return (
    <>
      <CustomAppBar />

      <Box className={classes.root}>
        <CustomDrawer />

        <Box component="main" className={classes.mainBox}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
