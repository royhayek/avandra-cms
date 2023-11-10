import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useCommonStyles = makeStyles((theme: Theme) => ({
  row: {
    display: "flex",
    "&.expand": {
      flex: 1,
    },
    "&.center": {
      alignItems: "center",
    },
    "&.flexEnd": {
      justifyContent: "flex-end",
    },
    "&.gap": {
      gap: 8,
    },
  },
  header: {
    gap: 2,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },
  avatar: {
    borderRadius: "50%",
    border: `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]}`,
    "& .MuiAvatar-img": {
      objectFit: "contain",
    },
  },
}));

export const useFormStyles = makeStyles((theme: Theme) => ({
  footer: {
    marginTop: 40,
    display: "flex",
    justifyContent: "end",
  },
}));
