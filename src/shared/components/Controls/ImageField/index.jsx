/* eslint-disable react/prop-types */
// Packages
import _ from 'lodash';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { connectField } from 'uniforms';

// Components
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';

// Component

const ImageField = ({ name, label, onChange, value, error, size, path, multiple, required }) => {
  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...commonStyles, ...styles };

  const hasError = useMemo(() => !_.isEmpty(error), [error]);

  // Callbacks
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // Convert files from FileList to Array if multiple files are supported
      onChange(multiple ? Array.from(files) : files[0]);
    }
  };

  // Renderers
  return (
    <Box>
      <InputLabel htmlFor="file-input" error={hasError}>
        <Box className={classNames(classes.container, { error: hasError })}>
          <Typography variant="caption" color={`${hasError ? 'text.error' : 'text.secondary'}`}>
            Click to choose {multiple ? 'images' : 'an image'}
          </Typography>
          <Typography variant="caption" className={classes.label}>
            {label} {required ? '*' : ''}
          </Typography>
        </Box>
      </InputLabel>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((file, index) => (
            <Box key={index} className={classNames(classes.imageContainer)}>
              <Box className={classNames(classes.row, 'center')} sx={{ gap: 2 }}>
                <img
                  alt=""
                  className={_.isEqual(size, 'small') ? classes.smallPreviewImage : classes.previewImage}
                  src={
                    _.isString(file)
                      ? `${process.env.REACT_APP_PUBLIC_URL}uploads/${path}/${file}`
                      : URL.createObjectURL(file)
                  }
                />
                <Typography variant="caption">{_.isString(file) ? file : file?.name}</Typography>
              </Box>
              <IconButton size="small" onClick={() => onChange(value.filter((_, i) => i !== index))}>
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            </Box>
          ))
        : null}
      <input
        name={name}
        type="file"
        id="file-input"
        multiple={multiple}
        onChange={handleFileChange}
        className={styles.fileInput}
      />
    </Box>
  );
};

ImageField.defaultProps = {
  path: '',
  size: 'medium',
  multiple: false,
  required: false
};

export default connectField(ImageField);
