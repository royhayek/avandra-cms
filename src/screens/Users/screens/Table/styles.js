import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4)
  },
  rowActionBtns: {
    gap: 4,
    display: "flex",
  },
  actionBtn: {
    background: theme.palette.mode === "light" ? "#f8f9fe" : "#252836",
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: "bold",
  },
}));

export default useStyles;
