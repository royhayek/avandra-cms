import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const appBarHeight = 64;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minWidth: 400,
    [theme.breakpoints.down("md")]: {
      minWidth: 300,
    },
  },
  header: {
    display: "flex",
    padding: "8px 16px 16px 16px",
    justifyContent: "space-between",
  },
  markAsReadBtn: {
    padding: "0px 4px",
  },
  body: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: "16px 16px 8px 16px",
  },
  notificationItemCard: {
    padding: 8,
    width: "100%",
    display: "flex",
    marginBottom: 8,
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
