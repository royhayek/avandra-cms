// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import Router from "router";
import MainLayout from "./components/MainLayout";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getUI } from "services/ui/selectors";
import { generateTheme } from "./lib/theme/theme";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "screens";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const App = () => {
  const { lang, theme: themeType } = useSelector(getUI);
  const theme = generateTheme(lang, themeType);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={{ display: "flex", flex: 1, width: "100%" }}>
        <BrowserRouter basename="">
          <MainLayout>
            <Router />
          </MainLayout>
          {/* <Login /> */}
        </BrowserRouter>

        <ToastContainer
          draggable
          newestOnTop
          hideProgressBar
          theme={themeType}
          closeButton={false}
          closeOnClick={false}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
