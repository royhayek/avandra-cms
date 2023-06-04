import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  root: {
    flex: 1,
    display: "flex",
    paddingTop: theme.spacing(1),
  },
  page: {
    margin: 16,
    width: "100%",
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  mainBox: {
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  },
}));

export default useStyles;
