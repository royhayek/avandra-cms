// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo } from "react";
import _ from "lodash";
import classNames from "classnames";
import { connectField } from "uniforms";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, IconButton, Input, InputLabel, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { extractBlobUrl } from "helpers";
import { useCommonStyles } from "lib/styles";
import useStyles from "./styles";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Image = ({ label, onChange, value, error, required }) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //------------------- RENDER VARS --------------------//
  const url = useMemo(
    () => (value?.name ? extractBlobUrl(value) : null),
    [value]
  );

  const hasError = useMemo(() => !_.isEmpty(error), [error]);
  //------------------ /RENDER VARS --------------------//
  //----------------------------------------------------//

  return (
    <Box>
      <InputLabel htmlFor="file-input" error={hasError}>
        <Box className={classNames(classes.container, { error: hasError })}>
          <Typography
            variant="caption"
            color={`${hasError ? "text.error" : "text.secondary"}`}
          >
            Click to choose an image
          </Typography>
          <Typography variant="caption" className={classes.label}>
            {label} {required ? "*" : ""}
          </Typography>
        </Box>
      </InputLabel>
      {url ? (
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
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) =>
          files && files[0] && onChange(files[0])
        }
        style={{ display: "none" }}
        type="file"
      />
    </Box>
  );
};

export default connectField(Image);
