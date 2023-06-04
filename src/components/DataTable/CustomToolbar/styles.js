import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //----------------------------------------------------//
  //-------------------- COMPONENT ---------------------//
  //----------------------------------------------------//
  quickFilter: {
    padding: 8,
    borderRadius: 8,
    minWidth: 300,
    background: theme.palette.background.main,
    border: "1px solid #8898aa30",
    "& .MuiInput-underline:before": {
      borderBottom: "none !important",
    },
    "& .MuiInput-root:after": {
      borderBottom: "none !important",
    },
    "& .MuiInputBase-input.MuiInput-input": {
      border: "none",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(1 / 2),
    },
  },
  toolbarEndBtnsContainer: {
    gap: 2,
    minHeight: 50,
    display: "flex",
    borderRadius: 8,
    background: theme.palette.background.main,
    border: "1px solid #8898aa30",
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
