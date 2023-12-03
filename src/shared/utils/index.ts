import { defaultMemoize, createSelectorCreator } from 'reselect';
import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';
// import useScreenOrientation from "react-hook-screen-orientation";
import { logout as logoutApi } from '../../redux/services/auth/api';
import { authActions } from '../../redux/services/auth/slice';
// import { useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material";
import { store } from 'app/store';
import _ from 'lodash';
import { userActions } from 'redux/user/slice';
import { useEffect, useState } from 'react';

export const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: null | string, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || ''
  );
};

export const extractBlobUrl = async (url: string): Promise<Blob> => {
  if (url.startsWith('blob:')) {
    // If the URL is already a blob URL, return it as is
    return fetch(url).then((response) => response.blob());
  } else if (url.startsWith('data:')) {
    // If the URL is a data URL, extract the base64 data and create a blob
    const [, data] = url.split(',');
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const type = url.split(';')[0].split(':')[1];

    return new Blob([arrayBuffer], { type });
  } else {
    // If it's not a blob or data URL, handle it accordingly
    // You might want to adjust this part based on your use case
    throw new Error('Unsupported URL format');
  }
};

// export const generateFileFromURL = (url: string, fileName: string) =>
//   fetch(url, { mode: "no-cors" }).then(async response => {
//     const contentType = response.headers.get("content-type");
//     const blob = await response.blob();
//     const file = new File([blob], fileName, { contentType });
//     return file;
//   });

export const customizer = (objVal: object, srcVal: string) => {
  // Always consider new array as the true source
  if (_.isArray(srcVal)) {
    return srcVal;
  }
};

// Create a "selector creator" that uses lodash.isequal instead of ===
export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, _.isEqual);

const getOrientation = () => window.screen.orientation.type;

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window.addEventListener('orientationchange', updateOrientation);

    return () => {
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  return orientation;
};

export const useIsSmall = () => {
  const width = useWidth();
  const orientation = useScreenOrientation();

  return !!width.match(/xs|sm/) || (!!width.match(/md/) && !!orientation.match(/portrait/));
};

export const logout = (reason: string) => {
  try {
    !_.isEmpty(reason) &&
      console.debug(
        `\n******************************************\nLoggin out -- Reason: ${reason}\n******************************************`
      );

    // ? ---------------------------------------- //
    // ? For fast-UI look & feel
    // ? ---------------------------------------- //
    // Clear all redux-data state if previously authenticated only (to avoid clearing public data)
    const prevAuth = store.getState().auth.authenticated;
    const prevRefreshToken = store.getState()?.auth.refreshToken;
    prevAuth && store.dispatch({ type: 'data/DESTROY' });

    // Reset redux-auth state before loggin-out
    store.dispatch(authActions.reset());
    store.dispatch(userActions.reset());

    // Call logout api
    return logoutApi({ refreshToken: prevRefreshToken });
  } catch (err) {
    console.error('Error in [Helpers - logout] :: ', err);
  }
};
