import { makeStyles } from "@mui/styles";

export const appBarHeight = 64;

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  container: {
    padding: "4px 8px",
    borderRadius: 2,
    border: "none",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows[1],
  },
  label: {
    lineHeight: "12px",
    marginBottom: 2,
  },
  desc: {
    lineHeight: "12px",
  },
}));

export default useStyles;
