import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const appBarHeight = 64;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "none",
    borderRadius: 2,
    display: "flex",
    padding: "4px 8px",
    flexDirection: "column",
    boxShadow: theme.shadows[1],
  },
  label: {
    marginBottom: 2,
    lineHeight: "12px",
  },
  desc: {
    lineHeight: "12px",
  },
}));

export default useStyles;
