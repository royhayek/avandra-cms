// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useState, ReactNode } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';
import { Box } from '@mui/material';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useIsSmall } from 'shared/utils';
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // --------------------------------------------------------- //
  // ------------------------ Static ------------------------- //
  const classes = useStyles();
  const isSmall = useIsSmall();

  const [openDrawer, setOpenDrawer] = useState(isSmall ? false : true);
  // ----------------------- /Static ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
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
