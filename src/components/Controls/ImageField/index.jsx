// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { connectField } from "uniforms";
import React, { useMemo } from "react";
import classNames from "classnames";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, IconButton, Input, InputLabel, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { extractBlobUrl, generateFileFromURL } from "helpers";
import { useCommonStyles } from "lib/styles/index.ts";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Image = ({ label, onChange, value, error, required }) => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...commonStyles, ...styles };
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
  const url = useMemo(async () => {
    if (value && !!String(value).match(/blob/)) {
      return extractBlobUrl(value);
    } else if (value && _.isString(value)) {
      const file = await generateFileFromURL(
        `${process.env.REACT_APP_PUBLIC_URL}/uploads/categories/${value}`,
        "category.png",
      );

      return extractBlobUrl(file);
    } else {
      return null;
    }
  }, [value]);

  const hasError = useMemo(() => !_.isEmpty(error), [error]);
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <Box>
      <InputLabel htmlFor="file-input" error={hasError}>
        <Box className={classNames(classes.container, { error: hasError })}>
          <Typography variant="caption" color={`${hasError ? "text.error" : "text.secondary"}`}>
            Click to choose an image
          </Typography>
          <Typography variant="caption" className={classes.label}>
            {label} {required ? "*" : ""}
          </Typography>
        </Box>
      </InputLabel>
      {!_.isNull(url) ? (
        <Box className={classNames(classes.imageContainer)}>
          <Box className={classNames(classes.row, "center")} sx={{ gap: 2 }}>
            <img alt="" className={classes.previewImage} src={url} />
            <Typography variant="caption">{value?.name}</Typography>
          </Box>
          <IconButton size="small" onClick={() => onChange()}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : null}
      <Input
        type="file"
        id="file-input"
        accept="image/*"
        className={styles.fileInput}
        onChange={({ target: { files } }) => files && files[0] && onChange(files[0])}
      />
    </Box>
  );
};

export default connectField(Image);
