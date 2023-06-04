import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
  },
}));

export default useStyles;
