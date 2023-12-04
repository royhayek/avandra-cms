// Packages
import React, { useState, ReactNode } from 'react';

// Components
import { Box } from '@mui/material';
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';

// Utilities
import useStyles from './styles';
import { useIsSmall } from 'shared/utils';

// Component
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Statics
  const classes = useStyles();
  const isSmall = useIsSmall();

  const [openDrawer, setOpenDrawer] = useState(isSmall ? false : true);

  // Renderers
  return (
    <div className={classes.root}>
      <CustomAppBar open={openDrawer} setOpen={setOpenDrawer} />
      <CustomDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <Box component="main" className={classes.mainBox}>
        <Box className={classes.toolbar} />
        {children}
      </Box>
    </div>
  );
};

export default MainLayout;
