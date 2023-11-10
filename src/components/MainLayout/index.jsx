// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useState } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer";
import { Box } from "@mui/material";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const MainLayout = ({ children }) => {
  // --------------------------------------------------------- //
  // ------------------------ Static ------------------------- //
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(true);
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
