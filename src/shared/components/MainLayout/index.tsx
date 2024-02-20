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
    <div className={classes.root}>
      <CustomAppBar />
      <CustomDrawer />
      <Box component="main" className={classes.mainBox}>
        <Box className={classes.toolbar} />
        {children}
      </Box>
    </div>
  );
};

export default MainLayout;
