import { light_colors } from "lib/theme/colors";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export default makeStyles((theme: Theme) => ({
  button: {
    fontWeight: 600,
    borderRadius: 50,
    textTransform: "none",
    color: light_colors.white,
    "&.outlined": {
      color: theme.palette.primary.main,
    },
  },
}));
