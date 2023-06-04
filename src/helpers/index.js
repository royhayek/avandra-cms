import _ from "lodash";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { defaultMemoize, createSelectorCreator } from "reselect";
import useScreenOrientation from "react-hook-screen-orientation";

export const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || ""
  );
};

export const extractBlobUrl = (blob) => URL.createObjectURL(blob);

export const generateFileFromURL = (url, fileName) =>
  fetch(url, { mode: "no-cors" }).then(async (response) => {
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const file = new File([blob], fileName, { contentType });
    return file;
  });

export const customizer = (objVal, srcVal, key) => {
  // Always consider new array as the true source
  if (_.isArray(srcVal)) {
    return srcVal;
  }
};

// Create a "selector creator" that uses lodash.isequal instead of ===
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

export const useIsSmall = () => {
  const width = useWidth();
  const orientation = useScreenOrientation();
  return (
    !!width.match(/xs|sm/) ||
    (!!width.match(/md/) && !!orientation.match(/portrait/))
  );
};
