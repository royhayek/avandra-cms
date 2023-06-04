import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  root: {
    display: "flex",
    flex: 1,
  },
  page: {
    margin: 16,
    width: "100%",
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

export default useStyles;
