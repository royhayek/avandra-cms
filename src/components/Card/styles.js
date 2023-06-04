import { makeStyles } from "@mui/styles";

export const appBarHeight = 64;

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  card: {
    padding: theme.spacing(4),
    width: "100%",
    minHeight: 85,
    borderRadius: "8px",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  },
}));

export default useStyles;
