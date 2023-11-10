import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
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
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default useStyles;
