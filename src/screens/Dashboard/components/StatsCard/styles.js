import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  container: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    justifyContent: "space-between",
  },
  iconContainer: {
    padding: 10,
    lineHeight: 0,
    color: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
