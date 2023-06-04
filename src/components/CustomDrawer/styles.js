import { makeStyles } from "@mui/styles";
import { appBarHeight } from "../CustomAppBar/styles";

const drawerWidth = 256;

export default makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  drawer: {
    overflowX: "hidden",
    borderRight: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.main,
    marginTop: `${appBarHeight}px`,
    width: `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: `calc(${theme.spacing(10)} + 1px)`,
    },
    "&.open": {
      width: drawerWidth,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  listItemButton: {
    minHeight: 56,
    justifyContent: "center",
    margin: "10px 16px",
    borderRadius: "8px",
    "&.open": {
      justifyContent: "initial",
    },
    "&.Mui-selected": {
      color: "white",
      background: theme.palette.primary.main,
    },
  },
  listItemIcon: {
    minWidth: 0,
    color: "inherit",
    marginRight: "auto",
    justifyContent: "center",
    "&.open": {
      marginRight: 16,
    },
  },
  listItemText: {
    opacity: 0,
    "&.open": {
      opacity: 1,
    },
  },
}));
