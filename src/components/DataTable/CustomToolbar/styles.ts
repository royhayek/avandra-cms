import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({

  quickFilter: {
    minWidth: 300,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: theme.spacing(1 / 2),
    },
  },
  toolbarEndBtnsContainer: {
    gap: 2,
    minHeight: 46,
    display: "flex",
    borderRadius: 8,
    background: theme.palette.mode === "light" ? "#FAFAFA" : "#20222a",
    [theme.breakpoints.down("md")]: {
      minHeight: 40,
      marginTop: theme.spacing(1),
    },
  },
  divider: {
    borderColor: "#8898aa30",
  },
}));

export default useStyles;
