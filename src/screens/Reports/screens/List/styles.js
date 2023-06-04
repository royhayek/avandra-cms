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
  itemContainer: {
    padding: 16,
    minHeight: 110,
    borderRadius: 4,
    cursor: "pointer",
    border: "1px solid ActiveBorder",
  },
}));

export default useStyles;
