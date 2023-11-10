import { defaultMemoize, createSelectorCreator } from "reselect";
// import useScreenOrientation from "react-hook-screen-orientation";
import { logout as logoutApi } from "redux/services/auth/api";
import { authActions } from "redux/services/auth/slice";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { store } from "redux/store";
import _ from "lodash";

// export const useWidth = () => {
//   const theme = useTheme();
//   const keys = [...theme.breakpoints.keys].reverse();
//   return (
//     keys.reduce((output, key) => {
//       // eslint-disable-next-line react-hooks/rules-of-hooks
//       const matches = useMediaQuery(theme.breakpoints.up(key));
//       return !output && matches ? key : output;
//     }, null) || ""
//   );
// };

export const extractBlobUrl = (blob: Blob) => URL.createObjectURL(blob);

export const generateFileFromURL = (url: string, fileName: string) =>
  fetch(url, { mode: "no-cors" }).then(async response => {
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const file = new File([blob], fileName, { contentType });
    return file;
  });

export const customizer = (objVal: unknown, srcVal: Array<string> | unknown, key: string) => {
  // Always consider new array as the true source
  if (_.isArray(srcVal)) {
    return srcVal;
  }
};

// Create a "selector creator" that uses lodash.isequal instead of ===
export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, _.isEqual);

export const useIsSmall = () => {
  // const width = useWidth();
  // const orientation = useScreenOrientation();
  // return !!width.match(/xs|sm/) || !!width.match(/md/); //&& !!orientation.match(/portrait/));
};

export const logout = (reason: string) => {
  try {
    !_.isEmpty(reason) &&
      console.debug(
        `\n******************************************\nLoggin out -- Reason: ${reason}\n******************************************`,
      );

    // ? ---------------------------------------- //
    // ? For fast-UI look & feel
    // ? ---------------------------------------- //
    // Clear all redux-data state if previously authenticated only (to avoid clearing public data)
    const prevAuth = store.getState().auth.authenticated;
    prevAuth && store.dispatch({ type: "data/DESTROY" });

    // Reset redux-auth state before loggin-out
    store.dispatch(authActions.update({ authenticated: false, loggedOut: true }));

    // Call logout api
    return logoutApi();
  } catch (err) {
    console.error("Error in [Helpers - logout] :: ", err);
  }
};
