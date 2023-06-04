import { makeStyles } from "@mui/styles";

export const appBarHeight = 64;

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  container: {
    minWidth: 400,
    [theme.breakpoints.down("md")]: {
      minWidth: 300,
    },
  },
  header: {
    padding: "8px 16px 16px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  markAsReadBtn: {
    padding: "0px 4px",
  },
  body: {
    padding: "16px 16px 8px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationItemCard: {
    padding: 8,
    width: "100%",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
