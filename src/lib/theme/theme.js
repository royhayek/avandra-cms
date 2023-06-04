import { createTheme } from "@mui/material";
import Mulish from "../fonts/Mulish-Regular.ttf";
import MulishBold from "../fonts/Mulish-Bold.ttf";

export const generateTheme = (direction = "ltr", mode = "light") => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#0D8BFF",
      },
      secondary: {
        main: mode === "light" ? "#92929D" : "#FFFFFF",
      },
      text: {
        primary: mode === "light" ? "rgba(44, 56, 74, 0.95)" : "#ffffff",
      },
      background: {
        main: mode === "light" ? "#ffffff" : "#1F1D2B",
        default: mode === "light" ? "#F2F6FF" : "#252836",
        paper: mode === "light" ? "#ffffff" : "#1F1D2B",
      },
      bluePurple: {
        main: "#beb8eb",
      },
      green: {
        main: "#0b5563",
      },
      lightBlue: {
        main: "#a2bce0",
      },
      divider: mode === "light" ? "#F2F6FF" : "#3C4156",
    },
    typography: {
      fontFamily: ["Mulish", "arial", "sans-serif"].join(","),
      subtitle1: {
        fontWeight: 600,
        fontSize: "1.1rem",
        marginBottom: 16,
      },
      subtitle2: {
        fontWeight: 600,
        textTransform: "none",
      },
      body1: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      caption: {
        textTransform: "none",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Mulish';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Mulish'), local('Mulish-Regular'), url(${Mulish}) format('ttf');
        }

        @font-face {
          font-family: 'Mulish';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Mulish'), local('Mulish-Bold'), url(${MulishBold}) format('ttf');
        }

        body {
          background-color: ${mode === "light" ? "#F2F6FF" : "#252836"};
        }

        .MuiButton-startIcon {
            margin-right: 0px !important;
            margin-left: 0px !important
        }

        // .MuiDataGrid-panelWrapper {
        //   border: 1px solid #8898aa30 !important;
        //   box-shadow: 0px 1px 15px -1px #e4e9fe !important;
        // }

        .MuiInputBase-input.MuiInput-input {
          padding: 8px;
          border-radius: 4px;
          margin-right: 6px;
          border: 1px solid #8898aa30;
        }

        .MuiInputBase-root.MuiInput-root:before {
          border-bottom: none;
        }

        .MuiInputBase-root.MuiInput-root:after {
          border-bottom: none;
        }

        .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before {
          border-bottom: none;
        }

        .MuiDataGrid-cell:focus-within {
          outline: 0
        }

        .MuiButtonBase-root.MuiIconButton-root {
          color: #9A9AB0
        }
      `,
      },
    },
  });
};
